import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import Chat from "@/models/Chat"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, chatHistory = [] } = await req.json()

    // Store message in database
    await connectToDatabase()
    await Chat.findOneAndUpdate(
      { userId: session.user.id },
      {
        $push: {
          messages: {
            content: message,
            sender: "user",
            timestamp: new Date()
          }
        }
      },
      { upsert: true, new: true }
    )

    // Build conversation context
    const conversationContext = chatHistory
      .slice(-10) // Last 10 messages for context
      .map((msg: any) => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n')

    const prompt = `You are ClimateBot on ClimateQuest 🌍, an AI assistant specializing in climate change education.

Role: Climate Education Expert
Tone: Friendly, encouraging, and educational
Style: Clear, concise, and engaging with occasional emojis 🌱

Recent conversation context:
${conversationContext}

User's current question: "${message}"

Please provide a helpful, accurate response about climate change, sustainability, or environmental protection. Keep responses under 150 words.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.8
          }
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()

    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "I'm having trouble thinking of a response right now. Could you try asking again?"

    // Store bot response in database
    await Chat.findOneAndUpdate(
      { userId: session.user.id },
      {
        $push: {
          messages: {
            content: botReply,
            sender: "bot",
            timestamp: new Date()
          }
        }
      },
      { upsert: true }
    )

    return NextResponse.json({ reply: botReply }, { status: 200 })

  } catch (error: any) {
    console.error("Chatbot API error:", error)
    return NextResponse.json(
      { error: "Failed to process your message", details: error.message },
      { status: 500 }
    )
  }
}

// Get chat history
export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const chat = await Chat.findOne({ userId: session.user.id })
    
    return NextResponse.json({ 
      messages: chat?.messages || [],
      totalMessages: chat?.messages?.length || 0
    }, { status: 200 })

  } catch (error: any) {
    console.error("Get chat history error:", error)
    return NextResponse.json(
      { error: "Failed to load chat history" },
      { status: 500 }
    )
  }
}
// Clear chat history
export async function DELETE() {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    await Chat.findOneAndDelete({ userId: session.user.id })

    return NextResponse.json({ message: "Chat history cleared" }, { status: 200 })

  } catch (error: any) {
    console.error("Clear chat error:", error)
    return NextResponse.json(
      { error: "Failed to clear chat history" },
      { status: 500 }
    )
  }
}