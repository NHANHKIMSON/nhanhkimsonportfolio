import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// In-memory storage for demo purposes
// In a real application, you would use a database
const messages = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Job Opportunity",
    message:
      "I'm impressed with your portfolio and would like to discuss a potential job opportunity with our company.",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Collaboration Request",
    message: "I'm working on a project that aligns with your skills. Would you be interested in collaborating?",
  },
]

export async function GET(request) {
  try {
    // Verify authentication for admin access
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Create new message
    const newMessage = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      subject: data.subject || "No Subject",
      message: data.message,
    }

    messages.push(newMessage)
    return NextResponse.json(newMessage)
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
