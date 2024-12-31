// "use client"
import ServerComp from "../../../components/agency/ServerComp";
// import { getServerSession } from "next-auth"
// import { useSession } from "next-auth/react"
import { Appbar } from "../../../components/Appbar";
// import { NEXT_AUTH } from "./api/auth/[...authRoutes]/options"


export default function Agency(){
    // const session = await getServerSession(NEXT_AUTH);
    // const session = useSession();

    // console.log(session)

    return (
        <>
        {/* <Appbar /> */}
        <ServerComp/>
        <h1>Agency Page</h1>
        </>
    )
}