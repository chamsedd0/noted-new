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

  // If trying to access protected path without being logged in
  if (protectedPaths.includes(req.nextUrl.pathname) && !userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in and trying to access login/register pages
  if (userId && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
