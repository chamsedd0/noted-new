import NextAUth from "next-auth/next";
import { authOptions } from "@/lib/auth";

const handler = NextAUth(authOptions);

export { handler as GET, handler as POST };
