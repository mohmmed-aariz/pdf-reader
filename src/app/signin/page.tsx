"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
    
//     return <div>
//     <div className="flex h-screen items-center justify-center ">
//       <div className="flex justify-center p-2 border">
//         <div>
//             <div className='flex justify-center font-medium	 text-xl mb-2'> 
//                 Signin Page 
//             </div>

//             <div className='flex flex-col border p-2'>
//                 <input type="text"  placeholder='email' onChange={(e) => {setUsername(e.target.value)}}/>
//                 <input type="password"  placeholder='password' onChange={(e) => {
//                     setPassword(e.target.value);
//                 }}/>
//                 <button onClick={async () => {
//                     const res = await signIn("credentials", {
//                         username: username,
//                         password: password,
//                         redirect: false,
//                         /**
//                          * redirect: true (Default): After successful authentication, the user will be automatically redirected to the original URL they were trying to access (the URL they were at before being prompted to sign in).

//                          * redirect: false: The authentication process will complete without any automatic redirection. This is useful in cases where you want to handle the redirection logic manually, for example, after checking additional user data or displaying a success message.

//                          * In your code snippet, you've set redirect: false. This means that after the user successfully signs in, they will not be automatically redirected to another page. Instead, you'll need to handle the redirection manually using the router.push function from next/navigation, which you've already included. 
//                         */
//                     });
//                     console.log(res);
//                     router.push("/agency")
//                 }}>Login with email</button>
//             </div>

            
//         </div>
//       </div>
//     </div>
//   </div>

  return <div className="h-screen flex justify-center flex-col">
          <div className="flex justify-center">
              {/* <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "> */}
              <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                  <div>
                      <div className="px-10">
                          <div className="text-3xl font-extrabold">
                              Sign In
                          </div>
                      </div>
                      <div className="pt-2">
                          
                          <LabelledInput onChange={(e: any) => {
                              setUsername(e.target.value);
                          }} label="Username" placeholder="Username" />

                          <LabelledInput onChange={(e: any) => {
                              setPassword(e.target.value)
                          }} label="Password" type={"password"} placeholder="123456" />

                          {/* <button onClick={()=>{
                              axios.post("http://localhost:3000/api/user", {
                                  username,
                                  password
                              })
                          }} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button> */}
                          <button onClick={async () => {
                            //   const user = await signup(name, username, password);
                            //   // console.log(user);
                            //   router.push('/agency')
                                const res = await signIn("credentials", {
                                    username: username,
                                    password: password,
                                    redirect: false,
                                });

                                console.log(res);
                                router.push("/agency");
  
                          }} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
                      </div>
                  </div>
              </div>
              {/* </a> */}
          </div>
      </div>
}


function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: any
}



// after making your own custom page remember ot add pages to auth.ts