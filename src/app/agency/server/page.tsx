

import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";
import { addPdfToDb, uploadFiles, uploadFirstFilePages } from "@/app/lib/actions";
// import { addPdfToDb } from "@/app/lib/actions";

// import { addPdfToDb } from "@/app/lib/actions";
import { utapi } from "@/server/uploadthing";
import { getServerSession } from "next-auth";
// import ServerComp from "../../../../components/agency/ServerComp";

// async function uploadFiles(formData: FormData) {
//     "use server";
//     const files = formData.getAll("files");
//     const response = await utapi.uploadFiles(files);
//     //    ^? UploadedFileResponse[]
//   }


// async function uploadFiles(formData: FormData) {
//     "use server"; 
//     const files = formData.getAll("files").map((file) => { 
//         if (file instanceof File) { 
//             return file; 
//         } 
//         throw new Error("Invalid file type"); 
//     }); 
    
//     const response = await utapi.uploadFiles(files); 
//     console.log(response); // For debugging purposes 
// }

export default async function Server(){
    // const session = await getServerSession(NEXT_AUTH);
    const session = await getServerSession(NEXT_AUTH);

    console.log("session from agency/server")
    const userId = session.user.id;
    console.log(parseInt(userId));
    
    

    // const uploadFiles = async (formData: FormData) => {
    //     "use server"
    //     console.log("insied uploadFiles server session")
    //     const files = formData.getAll("files").map((file) => { 
    //         if (file instanceof File) { 
    //             return file; 
    //         } 
    //         throw new Error("Invalid file type"); 
    //     }); 
        
    //     console.log("await for upload files")
    //     const response = await utapi.uploadFiles(files); 
        
    //     console.log(response); // For debugging purposes 
    
    //     const dataToUpload = response[0].data
        
    //     const session = getServerSession(NEXT_AUTH);
        
    //     addPdfToDb(dataToUpload?.name || "", dataToUpload?.key || "", dataToUpload?.url || "", dataToUpload?.appUrl || "", userId, dataToUpload?.size || 0);
    // }

    

    return (
        <>
        {/* <Appbar /> */}
        {/* <ServerComp/> */}
        {JSON.stringify(session)}
        <h1>Server component Page</h1>

        <br></br>
        <br></br>

        {/* <form action={uploadFiles}> */}
        <form action={uploadFirstFilePages}>
            <input name="files" type="file" multiple />
            <button type="submit">Upload</button>
        </form>
        </>
    )
}

