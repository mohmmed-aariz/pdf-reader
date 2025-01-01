

import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
// import ServerComp from "../../../../components/agency/ServerComp";


export default async function Agency(){
    // const session = await getServerSession(NEXT_AUTH);
    const session = await getServerSession(NEXT_AUTH);

    console.log(session)

    return (
        <>
        {/* <Appbar /> */}
        {/* <ServerComp/> */}
        {JSON.stringify(session)}
        <h1>Server component Page</h1>
        </>
    )
}

