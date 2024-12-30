import NextAuth from "next-auth";
import { NEXT_AUTH } from "./options";

const handler = NextAuth(NEXT_AUTH);

// const handler = NextAuth(NEXT_AUTH3);
// import { NEXT_AUTH3 } from "./options3";


export const GET = handler;

export const POST = handler;