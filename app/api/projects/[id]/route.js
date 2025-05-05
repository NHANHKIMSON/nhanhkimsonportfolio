import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// Reference to the in-memory projects array
// In a real application, you would use a database
import { projects } from "../route"

export async function GET(request, { params }) {
  const { id } = params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 })
  }

  return NextResponse.json(project)
}

export async function PUT(request, { params }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const { id } = params
    const data = await request.json()

    // Find project index
    const projectIndex = projects.findIndex((p) => p.id === id)

    if (projectIndex === -1) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 })
    }

    // Update project
    const updatedProject = {
      ...projects[projectIndex],
      ...data,
      id, // Ensure ID doesn't change
    }

    projects[projectIndex] = updatedProject
    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error updating project:", error)
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

    // Find project index
    const projectIndex = projects.findIndex((p) => p.id === id)

    if (projectIndex === -1) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 })
    }

    // Remove project
    const deletedProject = projects[projectIndex]
    projects.splice(projectIndex, 1)

    return NextResponse.json(deletedProject)
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
