import NextAuth from "next-auth";
import { NEXT_AUTH } from "./options";

const handler2 = NextAuth(NEXT_AUTH);

export const GET = handler2;

export const POST = handler2;