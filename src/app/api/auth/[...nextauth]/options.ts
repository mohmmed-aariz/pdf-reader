import client from "../../../../../db"
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from 'bcrypt';
import bcryptjs from 'bcryptjs'



export const NEXT_AUTH = {

    providers: [
        CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
    
        credentials: {
        username: { label: "Username", type: "text", placeholder: "Username", require: true},
        password: { label: "Password", type: "password", require: true }
        },
    
        async authorize(credentials, req): Promise<any> {
            const hashPassword = await bcryptjs.hash(credentials?.password || "" , 10);
            console.log("hi there!")
            console.log(credentials?.username || "no username");
            console.log(credentials?.password || "no password");
            const existingUser = await client.admin.findFirst({
                where: {
                    username: credentials?.username
                }
            })
    
            if(!existingUser){
                throw new Error("No user with this email found");
            }
            // we can even check if the user is verified or not!
    
            
            // we will search for the email of the user in db and check if the password in the db matches the password entered by the user
            const passwordValidate = await bcryptjs.compare(credentials?.password || "", existingUser.password)
    
            if(passwordValidate){
                return {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.username
                    
                }
                // console.log(existingUser);
                // console.log("after hi there")
                
                // return existingUser
            }
            else {
                throw new Error("Incorrect password!");
                // or return null
            }
        }
    }),
],

secret: process.env.NEXTAUTH_SECRET,
callbacks: {
        async jwt({token, user }: {token: any, user: any }){
            // console.log("token is: ")
            // console.log(token);
            // console.log("user is: ")
            // console.log(user);
            // console.log("________")
            token.id = token.sub;

            const info = await client.admin.findFirst({
                where: {
                    id: parseInt(token.sub)
                }
            })

            // console.log("info is: ");
            // console.log(info);


            token.role = info?.role

            
            // console.log("updated token is: ")
            // console.log(token);



        
            return token
        },

        // async session({ session, user, token}: {session: any, user: any, token: any}){
        async session({ session, token}: {session: any, token: any}){

            // console.log("session is: ")
            // console.log(session);

            // console.log("user is: ")
            // console.log(user);

            // console.log("token is: ")
            // console.log(token);

            // console.log("_________")

            session.user.role = token.role;

            // console.log("updated session is: ")
            // console.log(session);


            // session.user.adminId = client.admin.findFirst(
            //     {
            //         where: {
            //             id: token.sub
            //         }
            //     }
            // ).



            // session.user.email = user

            console.log("session getting called")

            return session
        },

    },
pages: {
    signIn: '/signin'
}
    
}