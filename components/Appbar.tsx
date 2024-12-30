"use client"
import { signIn, signOut, useSession } from "next-auth/react";


// // doing the router logic is great, but you can even do the simple stuff by "next-auth/react" so you wont need to the any of the router logic
// export const Appbar = () => {
//     const router = useRouter();
//     return <div className="flex">
//         <div style={{ border: '2px solid white', padding: '10px', borderRadius: '5px' }}>
//             <button onClick={()=>{
//                 router.push("/api/auth/signin");
//             }}>Signin</button>
//         </div>
//     </div>
// }

export const Appbar = () => {
    const session = useSession();

    return <div>
            <div className="flex">
            <div style={{ border: '2px solid white', padding: '10px', borderRadius: '5px' }}>
                <button onClick={()=>{
                    signIn();
                    // just call signIn over here, it will automatically take you to the signIn page
                }}>Signin</button>
            </div>
            {/* and it even gives us the benefit of adding logout button  */}
            <div style={{ border: '2px solid white', padding: '10px', borderRadius: '5px' }}>
                <button onClick={()=>{
                    signOut();
                }}>Logout</button>
            </div>
        </div>
        <div>
            {JSON.stringify(session)}
            {/* currently we are returning a hard-coded user for every request */}
        </div>
    </div>
}