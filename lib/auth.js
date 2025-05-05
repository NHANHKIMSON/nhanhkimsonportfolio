import jwt from "jsonwebtoken"

// Secret key for JWT verification - in production, use environment variables
const JWT_SECRET = "your-secret-key"

export async function verifyAuth(request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        success: false,
        message: "Authorization header missing or invalid",
        status: 401,
      }
    }

    // Extract token
    const token = authHeader.split(" ")[1]

    if (!token) {
      return {
        success: false,
        message: "Token missing",
        status: 401,
      }
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET)

      // Check if user has admin role
      if (decoded.role !== "admin") {
        return {
          success: false,
          message: "Insufficient permissions",
          status: 403,
        }
      }

      return {
        success: true,
        user: decoded,
      }
    } catch (error) {
      return {
        success: false,
        message: "Invalid or expired token",
        status: 401,
      }
    }
  } catch (error) {
    console.error("Auth verification error:", error)
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    }
  }
}
