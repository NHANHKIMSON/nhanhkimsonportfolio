import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"

// Reference to the in-memory skills array
// In a real application, you would use a database
import { skills } from "../route"

export async function GET(request, { params }) {
  const { id } = params
  const skill = skills.find((s) => s.id === id)

  if (!skill) {
    return NextResponse.json({ message: "Skill not found" }, { status: 404 })
  }

  return NextResponse.json(skill)
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

    // Find skill index
    const skillIndex = skills.findIndex((s) => s.id === id)

    if (skillIndex === -1) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 })
    }

    // Update skill
    const updatedSkill = {
      ...skills[skillIndex],
      ...data,
      id, // Ensure ID doesn't change
    }

    skills[skillIndex] = updatedSkill
    return NextResponse.json(updatedSkill)
  } catch (error) {
    console.error("Error updating skill:", error)
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

    // Find skill index
    const skillIndex = skills.findIndex((s) => s.id === id)

    if (skillIndex === -1) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 })
    }

    // Remove skill
    const deletedSkill = skills[skillIndex]
    skills.splice(skillIndex, 1)

    return NextResponse.json(deletedSkill)
  } catch (error) {
    console.error("Error deleting skill:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
