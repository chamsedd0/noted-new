import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = "HS256";

interface JWTPayload {
  userId: string;
}

export const generateToken = async (userId: string): Promise<string> => {
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
