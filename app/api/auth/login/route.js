import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// In a real application, you would use a database to store users
// This is just a simple example
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin123"

// Secret key for JWT signing - in production, use environment variables
const JWT_SECRET = "your-secret-key"

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        username,
        role: "admin",
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    )

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
