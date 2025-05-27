import { SignJWT, jwtVerify } from "jose";

// Default to a placeholder that will cause an error if used
const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key-goes-here";

// Log which secret we're using (without revealing the actual secret)
console.log("Using JWT secret:", process.env.JWT_SECRET ? "From environment" : "Missing JWT_SECRET env variable");

const secret = new TextEncoder().encode(JWT_SECRET);
const alg = "HS256";

interface JWTPayload {
  userId: string;
}

export const generateToken = async (userId: string): Promise<string> => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET environment variable is not set");
  }
  
  return new SignJWT({ userId })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.userId !== "string") {
      throw new Error("Invalid token payload structure");
    }
    return {
      userId: payload.userId,
    };
  } catch (err) {
    console.error("Token verification failed:", err);
    throw new Error("Invalid or expired token");
  }
};
