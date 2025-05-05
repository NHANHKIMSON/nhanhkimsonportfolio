import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// In-memory storage for demo purposes
// In a real application, you would use a database
const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
    tech: ["React", "Node.js", "MongoDB"],
    imageUrl: "",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    imageUrl: "",
  },
]

export async function GET(request) {
  // For demo purposes, we're not requiring auth for GET requests
  // In a real application, you might want to protect this endpoint
  return NextResponse.json(projects)
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
    if (!data.title || !data.description || !data.tech) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Create new project
    const newProject = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      tech: data.tech,
      imageUrl: data.imageUrl || "",
    }

    projects.push(newProject)
    return NextResponse.json(newProject)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
