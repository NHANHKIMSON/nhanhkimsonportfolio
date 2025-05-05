import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// In-memory storage for demo purposes
// In a real application, you would use a database
const skills = [
  {
    id: "1",
    name: "Java Spring",
    color: "bg-green-600",
  },
  {
    id: "2",
    name: "PHP Laravel",
    color: "bg-red-600",
  },
  {
    id: "3",
    name: "C#",
    color: "bg-purple-600",
  },
  {
    id: "4",
    name: "Python Flask",
    color: "bg-blue-600",
  },
]

export async function GET(request) {
  // For demo purposes, we're not requiring auth for GET requests
  return NextResponse.json(skills)
}

export async function POST(request) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.color) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Create new skill
    const newSkill = {
      id: Date.now().toString(),
      name: data.name,
      color: data.color,
    }

    skills.push(newSkill)
    return NextResponse.json(newSkill)
  } catch (error) {
    console.error("Error creating skill:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
