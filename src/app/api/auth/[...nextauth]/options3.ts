import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";


export const NEXT_AUTH3 = {

    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: { label: 'password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials: any) {
                // console.log("Credentials are: ")
                // console.log(credentials);

                return {
                    id: "user1",
                    name: "Mohmmed Aariz",
                    email: "aariz@gmail.com"
                };
            },
        }),

        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID || "",
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        // }),

        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID || "",
        //     clientSecret: process.env.GITHUB_SECRET || ""
        // })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: ({token, user}: any) => {
            // console.log("token is: ");
            // console.log(token);
            // token.userId = token.sub;

            return token;
        },
        session: ({session, token, user}: any) => {
            // if (session && session.user) {
            //     console.log("Session is: " );
            //     console.log(session);
            //     session.user.id = token.sub; // token.sub
            // }
            return session;
        }
    },
    
}

/* when we signin with GitHub provider we get 
token is:
{
  name: 'mohmmed-aariz',
  picture: 'https://avatars.githubusercontent.com/u/107600664?v=4',
  sub: '107600664',
  iat: 1726907792,
  exp: 1729499792,
  jti: '4c95a0b3-43e7-413d-91d3-b1f34eac3594'
}
Session is:
{
  user: {
    name: 'mohmmed-aariz',
    email: undefined,
    image: 'https://avatars.githubusercontent.com/u/107600664?v=4'
  },
  expires: '2024-10-21T08:36:33.409Z'
}
  */