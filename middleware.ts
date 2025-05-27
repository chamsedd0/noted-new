import { NextRequest, NextResponse } from "next/server";

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
  try {
    // Check for token presence (without verification for now)
    const token = req.cookies.get("token");
    const isLoggedIn = !!token;

    // If trying to access protected path without being logged in
    if (protectedPaths.includes(req.nextUrl.pathname) && !isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If logged in and trying to access login/register pages
    if (isLoggedIn && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Allow the request to continue
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Always allow the request in case of errors
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
