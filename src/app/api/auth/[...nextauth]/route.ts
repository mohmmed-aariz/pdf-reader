import { NEXT_AUTH } from "@/app/agency/api/auth/[...authRoutes]/options";
import NextAuth from "next-auth";

const handler = NextAuth(NEXT_AUTH);

export const GET = handler;

export const POST = handler;