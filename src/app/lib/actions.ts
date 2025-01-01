"use server"

import client from "../../../db"
import bcryptjs from "bcryptjs";

// import {redirect } from "next/navigate"


export async function  signup(name: string, username: string, passowrd: string){
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
                name: name,
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


export const addPdfToDb = async (title: string, pdfKey:string, pdfUrl:string, pdfAppUrl:string, authorId:number, pdfSize: number) => {
    const newFile = await client.pdfDocument.create({
        data:{
        title: title,
        pdfUrl: pdfUrl,
        pdfAppUrl: pdfAppUrl,
        pdfKey: pdfKey,
        authorId: authorId,
        size: pdfSize
        }
        
    })

    // console.log("title: ", title);
    // console.log("pdfKey: ", pdfKey);
    // console.log("pdf url: ", pdfUrl);
    // console.log("pdfAppUrl: ", pdfAppUrl);
    // console.log("authorid: ", typeof(authorId));
    // console.log("pdfSize: ", typeof(pdfSize))

    // console.log(parseInt(authorId));


    console.log("added new file to db: " , newFile);

    return newFile;
}
