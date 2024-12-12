import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/utils/jwt";

// Define protected paths that require authentication
const protectedPaths = [
  "/personal-info",
  "/add-courses",
  "/add-syllabus",
  "/add-time-slots",
  "/choose-plan",
  "/dashboard",
  "/settings",
  "/profile",
  "/scheduler",
];

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const userId = token ? await verifyToken(token.value) : null;
  if (protectedPaths.includes(req.nextUrl.pathname) && !userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
