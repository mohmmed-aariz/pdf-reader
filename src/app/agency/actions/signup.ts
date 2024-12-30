"use server"

import client from "../../../../db"
import bcryptjs from "bcryptjs";

export default async function  signup(username: string, passowrd: string){
    const hashPassword = await bcryptjs.hash(passowrd, 10);

    const userExists = await client.admin.findFirst({
        where: {
            username: username
        }
    })

    if(userExists){
        throw new Error("User with this email already exists");
    }

    try {
        const user = await client.admin.create({
            data: {
                username: username,
                password: hashPassword
            }
        })

        console.log(user);
        
        return user
    } catch (error) {
        console.log(error);
    }

    return null
}