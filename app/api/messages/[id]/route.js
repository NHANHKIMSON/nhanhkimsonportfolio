import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// Reference to the in-memory messages array
// In a real application, you would use a database
import { messages } from "../route"

export async function GET(request, { params }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const { id } = params
    const message = messages.find((m) => m.id === id)

    if (!message) {
      return NextResponse.json({ message: "Message not found" }, { status: 404 })
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error fetching message:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const { id } = params

    // Find message index
    const messageIndex = messages.findIndex((m) => m.id === id)

    if (messageIndex === -1) {
      return NextResponse.json({ message: "Message not found" }, { status: 404 })
    }

    // Remove message
    const deletedMessage = messages[messageIndex]
    messages.splice(messageIndex, 1)

    return NextResponse.json(deletedMessage)
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
