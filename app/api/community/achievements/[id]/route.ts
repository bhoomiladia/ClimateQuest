// app/api/community/achievements/[id]/route.ts
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ id: params.id, user: "Bhoomi", title: "Sample Achievement" })
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: `Achievement ${params.id} deleted` })
}
