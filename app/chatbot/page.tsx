"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Globe, Trash2, Loader2, Lightbulb, Sparkles } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)

  const suggestedQuestions = [
    "What causes climate change?",
    "How can I reduce my carbon footprint?",
    "What are renewable energy sources?",
    "Why is recycling important?",
    "What is carbon offsetting?",
    "How does deforestation affect climate?",
  ]

  // Load chat history
  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
      return
    }
    loadChatHistory()
  }, [session, status, router])

  // Auto scroll down
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const loadChatHistory = async () => {
    try {
      const res = await fetch("/api/chatbot")
      if (res.ok) {
        const data = await res.json()
        if (data.messages?.length) {
          setMessages(
            data.messages.map((msg: any) => ({
              id: msg._id || Date.now().toString(),
              content: msg.content,
              sender: msg.sender,
              timestamp: new Date(msg.timestamp),
            }))
          )
        } else {
          setMessages([
            {
              id: "1",
              content:
                "Hi there! 👋 I'm ClimateBot, your friendly climate learning assistant. Ask me anything about climate change, sustainability, or eco-friendly tips! 🌍",
              sender: "bot",
              timestamp: new Date(),
            },
          ])
        }
      }
    } catch (error) {
      console.error("Failed to load chat history:", error)
      toast.error("Failed to load chat history")
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setLoading(true)

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          chatHistory: messages.slice(-10),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to get response")

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (err: any) {
      console.error("Error sending message:", err)
      toast.error("Failed to send message")
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content:
            "⚠️ Sorry, I'm having trouble responding right now. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => document.querySelector("input")?.focus(), 100)
  }

  const clearChatHistory = async () => {
    try {
      const res = await fetch("/api/chatbot", { method: "DELETE" })
      if (res.ok) {
        setMessages([
          {
            id: "1",
            content:
              "🧹 Chat cleared! I'm ready to help you learn about climate change. What would you like to know? 🌱",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
        toast.success("Chat history cleared")
      }
    } catch (error) {
      console.error("Failed to clear chat:", error)
      toast.error("Failed to clear chat")
    }
  }

  if (status === "loading" || isLoadingHistory) {
    return (
      <div className="min-h-screen bg-pastel-gradient flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-pistachio mr-2" />
        <span className="text-charcoal">Loading ClimateBot...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nyanza via-tea-green/60 to-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-celadon/30 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pistachio to-celadon rounded-full flex items-center justify-center shadow">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-poppins font-bold text-charcoal">
                ClimateBot
              </h1>
              <p className="text-sm text-sage-dark">
                Your AI Climate Learning Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={clearChatHistory}
              className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Chat
            </Button>
            <Link href="/mainpage">
              <Button
                variant="outline"
                className="border-celadon text-celadon hover:bg-celadon hover:text-white"
              >
                Back Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col bg-white/95 backdrop-blur-sm border-celadon/20 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-celadon/20 py-4 flex items-center justify-between bg-gradient-to-r from-white to-nyanza/40">
                <CardTitle className="text-lg font-poppins text-charcoal flex items-center gap-2">
                  <Globe className="h-5 w-5 text-pistachio" />
                  Climate Learning Chat
                </CardTitle>
                <span className="text-sm text-sage-dark bg-nyanza/80 px-3 py-1 rounded-full">
                  {messages.length} messages
                </span>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* FIX: scroll area gets explicit height */}
                <ScrollArea className="h-[480px] px-5 py-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-end m-2 gap-3 ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <Avatar className="w-9 h-9 shadow bg-gradient-to-br from-pistachio to-celadon">
                          <AvatarFallback className="text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-pistachio to-celadon text-white rounded-br-none"
                            : "bg-nyanza/90 border border-celadon/20 text-charcoal rounded-bl-none"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        <span
                          className={`text-[10px] block mt-2 ${
                            message.sender === "user"
                              ? "text-white/70"
                              : "text-sage-dark"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="w-9 h-9 shadow bg-gradient-to-br from-celadon to-sage-dark">
                          <AvatarFallback className="text-white">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t border-celadon/20 bg-white/70">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me about climate change..."
                      className="flex-1 border-celadon/30 focus:border-pistachio focus:ring-pistachio/20 rounded-full px-4"
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      disabled={loading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-pistachio to-celadon hover:from-celadon hover:to-sage-dark text-white rounded-full shadow-md transition-all duration-200 transform hover:scale-105"
                      size="icon"
                      disabled={loading || !inputValue.trim()}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 w-fit">
            {/* Quick Questions */}
            <Card className="bg-white/95 backdrop-blur-sm border-celadon/20 shadow-lg rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-poppins text-charcoal flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-pistachio" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start py-2 px-3 border-celadon/20 text-charcoal hover:bg-nyanza hover:border-celadon/40 bg-white/80 rounded-lg text-xs transition-all"
                    onClick={() => handleSuggestedQuestion(question)}
                    disabled={loading}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-white/95 backdrop-blur-sm border-celadon/20 shadow-lg rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-poppins text-charcoal flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-pistachio" />
                  Tips & Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-nyanza/50 rounded-lg border border-celadon/20">
                  <p className="font-medium">🌱 Specific Questions</p>
                  <p className="text-xs text-sage-dark mt-1">
                    Ask detailed questions for better answers
                  </p>
                </div>
                <div className="p-3 bg-tea-green/40 rounded-lg border border-celadon/20">
                  <p className="font-medium">💡 Multiple Topics</p>
                  <p className="text-xs text-sage-dark mt-1">
                    Energy, conservation, wildlife, and more!
                  </p>
                </div>
                <div className="p-3 bg-honeydew/60 rounded-lg border border-celadon/20">
                  <p className="font-medium">📚 Learning Paths</p>
                  <p className="text-xs text-sage-dark mt-1">
                    Follow structured learning journeys
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
