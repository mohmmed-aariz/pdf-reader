"use server"


// import { UTApi } from "uploadthing/server";
import { utapi } from "@/server/uploadthing"
import client from "../../../db"
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../api/auth/[...nextauth]/options";

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


export const addPdfToDb = async (title: string, pdfKey:string, pdfUrl:string, pdfAppUrl:string, authorId:number, pdfSize: number, totalPages: number) => {
    const newFile = await client.pdfDocument.create({
        data:{
        title: title,
        pdfUrl: pdfUrl,
        pdfAppUrl: pdfAppUrl,
        pdfKey: pdfKey,
        authorId: authorId,
        size: pdfSize,
        totalPages: totalPages
        }
        
    })

    // const newFile = await client.pdfDocument.create({
    //     data: {
    //       title: title,
    //       pdfUrl: pdfUrl,
    //       pdfAppUrl: pdfAppUrl,
    //       pdfKey: pdfKey,
    //       size: pdfSize,
    //       authorId: authorId,
    //       pages: {
    //         // create: uploadResponse.map((page, index) => )
    //         // create: response.map((page, index) => ({
    //         //   pageNumber: index + 1,
    //         //   pdfUrl: page.data.url,
    //         //   pdfAppUrl: page.data.appUrl,
    //         //   pdfKey: page.data.key,
    //         // }))
    //       }
    //     },
    //     include: {
    //       pages: true
    //     }
    //   });
      

    
    

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


// export async function uploadFiles(formData: FormData) {
//     console.log("insied uploadFiles server session")
//     const files = formData.getAll("files").map((file) => { 
//         if (file instanceof File) { 
//             return file; 
//         } 
//         throw new Error("Invalid file type"); 
//     }); 
    
//     console.log("await for upload files")
//     // console.log(files);

//     const response = await utapi.uploadFiles(files); 
    
//     // console.log(response); // For debugging purposes 

//     const dataToUpload = response[0].data

    
//     const session = await getServerSession(NEXT_AUTH);

//     // console.log("Session from server action");
//     // console.log(session)
    
//     // const dbRes = await addPdfToDb(dataToUpload?.name || "", dataToUpload?.key || "", dataToUpload?.url || "", dataToUpload?.appUrl || "", parseInt(session.user.id) , dataToUpload?.size || 0 )

//     try {
//         if(dataToUpload){
//             const dbRes = await addPdfToDb(dataToUpload?.name , dataToUpload?.key , dataToUpload?.url , dataToUpload?.appUrl , parseInt(session.user.id) , dataToUpload?.size )
//             console.log(dbRes);

//         }
//     } catch (err) {
//         throw new Error("error while uploading the document to db");
//     }

// }

// export async function uploadFirstFile(formData: FormData) {
//     console.log("insied uploadFiles server session")
//     const files = formData.getAll("files").map((file) => { 
//         if (file instanceof File) { 
//             return file; 
//         } 
//         throw new Error("Invalid file type"); 
//     }); 
    
//     console.log("await for upload files")
//     // console.log(files);
//     const first = files[0];
//     console.log(first);
//     const response = await utapi.uploadFiles(first); 

//     // const response = await utapi.uploadFiles(files); 
    
//     // console.log(response); // For debugging purposes 

//     // const dataToUpload = response[0].data
//     const dataToUpload = response.data

    
//     const session = await getServerSession(NEXT_AUTH);

//     // console.log("Session from server action");
//     // console.log(session)
    
//     // const dbRes = await addPdfToDb(dataToUpload?.name || "", dataToUpload?.key || "", dataToUpload?.url || "", dataToUpload?.appUrl || "", parseInt(session.user.id) , dataToUpload?.size || 0 )

//     try {
//         if(dataToUpload){
//             const dbRes = await addPdfToDb(dataToUpload?.name , dataToUpload?.key , dataToUpload?.url , dataToUpload?.appUrl , parseInt(session.user.id) , dataToUpload?.size )
//             console.log(dbRes);

//         }
//     } catch (err) {
//         throw new Error("error while uploading the document to db");
//     }

// }

import { PDFDocument } from 'pdf-lib';
import page from "../signin/page";

// export async function uploadFirstFilePages(formData: FormData) {
//     console.log("inside uploadFiles server session");

//     const files = formData.getAll("files").map((file) => {
//         if (file instanceof File) {
//             return file;
//         }
//         throw new Error("Invalid file type");
//     });

//     const file = files[0];
//     if (!file) {
//         throw new Error("No file found");
//     }

//     const fileBuffer = await file.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(fileBuffer);

//     const totalPages = pdfDoc.getPageCount();
//     console.log(`Total Pages: ${totalPages}`);

//     for (let i = 0; i < totalPages; i++) {
//         const newPdf = await PDFDocument.create();
//         const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
//         newPdf.addPage(copiedPage);

//         const pdfBytes = await newPdf.save();
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//         const newFile = new File([blob], `page_${i + 1}.pdf`, { type: 'application/pdf' });

//         console.log(`Uploading page ${i + 1}`);
//         const response = await utapi.uploadFiles(newFile);

//         // const dataToUpload = response[0].data;
//         const dataToUpload = response.data;

//         const session = await getServerSession(NEXT_AUTH);

//         try {
//             if (dataToUpload) {
//                 // error due to total pages
//                 const dbRes = await addPdfToDb(
//                     dataToUpload?.name,
//                     dataToUpload?.key,
//                     dataToUpload?.url,
//                     dataToUpload?.appUrl,
//                     parseInt(session.user.id),
//                     dataToUpload?.size
//                 );
//                 console.log(dbRes);
//             }
//         } catch (err) {
//             throw new Error("Error while uploading the document to DB");
//         }
//     }
// }



export const addPdfPagesToDb = async (title: string, pageNumber: number, pdfUrl: string, pdfAppUrl: string, pdfKey: string, pdfDocumentId: number) => {
    const newFile = await client.pdfPage.create({
        data: {
            title: title,
            pageNumber: pageNumber,
            pdfUrl: pdfUrl,
            pdfAppUrl: pdfAppUrl,
            pdfKey: pdfKey,
            pdfDocumentId: pdfDocumentId
        }
    })

    console.log(`${pageNumber}: `, newFile);
    return newFile;   
}


export async function uploadFirstFilePagesLite(firstFile: File, userId: number, docId: number ) {
    console.log("inside uploadFiles server session lite");

    const fileBuffer = await firstFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBuffer);

    const totalPages = pdfDoc.getPageCount();
    const fileName = pdfDoc;
    // console.log(fileName);
    console.log(`Total Pages: ${totalPages}`);

    const pageUrlArr = [];

    for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const newFile = new File([blob], `${docId}_page_${i + 1}.pdf`, { type: 'application/pdf' });

        console.log(`Uploading page ${i + 1}`);
        const pdfPageTitle = `${docId}_${i+1}`;
        const response = await utapi.uploadFiles(newFile);

        // const dataToUpload = response[0].data;
        const dataToUpload = response.data;

        // const session = await getServerSession(NEXT_AUTH);

        try {
            if (dataToUpload) {
                // add file name to dfPage
                const dbRes = await addPdfPagesToDb(pdfPageTitle,i+1,dataToUpload.url, dataToUpload.appUrl, dataToUpload.key, docId)
                // console.log(dbRes);
                pageUrlArr.push(dbRes.pdfAppUrl);
            }
        } catch (err) {
            throw new Error("Error while uploading the document to DB");
        }
    }

    console.log("Page url array: ", pageUrlArr);
    return pageUrlArr;
    
}




export async function uploadFileAndPages(formData: FormData) {
    const session = await getServerSession(NEXT_AUTH);
    const authorId = parseInt(session.user.id);

    console.log("insied uploadFiles server session")

    const files = formData.getAll("files").map((file) => { 
        if (file instanceof File) { 
            return file; 
        } 
        throw new Error("Invalid file type"); 
    }); 

    const firstFile = files[0];

    const fileBuffer = await firstFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBuffer);

    const totalPages = pdfDoc.getPageCount();

    const response = await utapi.uploadFiles(firstFile); 
    const dataToUpload = response.data;
    

    try {
        if(dataToUpload){
            // uploading file to db
            const dbRes = await addPdfToDb(dataToUpload?.name , dataToUpload?.key , dataToUpload?.url , dataToUpload?.appUrl , authorId , dataToUpload?.size, totalPages )
            console.log("dbRes: ", dbRes);
            // const dbRes = {"id": 2};

            if(dbRes){
                // uploading pages to db
                const pdfPagesUrl = await uploadFirstFilePagesLite(firstFile , authorId, dbRes.id );
                // how to add pdfPagesUrl to PdfDocument table
                await updatePdfDocumentWithPageUrls(dbRes.id, pdfPagesUrl);
                console.log("Upload Successful!");
            }

        }
    } catch (err) {
        throw new Error("error while uploading the document to db");
    }


}

async function updatePdfDocumentWithPageUrls(pdfDocumentId: number, pdfPagesUrl: string[]){
    await client.pdfDocument.update({
        where: {
            id: pdfDocumentId
        },
        data: {
            pdfPagesUrl: pdfPagesUrl
            // pdfPagesUrl: JSON.stringify(pdfPagesUrl),
        }
    })
}