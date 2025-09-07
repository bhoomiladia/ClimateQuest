// app/api/community/posts/[id]/route.ts
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ id: params.id, user: "Bhoomi", content: "Sample post" })
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  return NextResponse.json({ message: `Post ${params.id} updated`, data: body })
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: `Post ${params.id} deleted` })
}
