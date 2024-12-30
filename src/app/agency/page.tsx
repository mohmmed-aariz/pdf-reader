"use client"
// import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { NEXT_AUTH } from "./api/auth/[...authRoutes]/options"


export default function Agency(){
    // const session = await getServerSession(NEXT_AUTH);
    const session = useSession();

    console.log(session)
    console.log("follows:");
    console.log(session.status)

    return (
        <>
        <h1>Agency Page</h1>
        </>
    )
}