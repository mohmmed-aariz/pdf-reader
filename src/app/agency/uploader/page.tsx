"use client"

import { UploadButton } from "@/utils/uploadthing"
import { useSession } from "next-auth/react";
import { useState } from "react";
import client from "@/../../db"
import { addPdfToDb } from "@/app/lib/actions";

export default function Home() {
  const [title, setTitle] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfKey, setPdfKey] = useState("");
  const [pdfAppUrl, setPdfAppUrl] = useState("");
  const [authorId, setAuthorId] = useState(0);
  const [pdfSize, setPdfSize] = useState(0);
  const session = useSession();
  console.log("uploader session is ")
  // console.log(session.data?.user.id)


  // const addPdfToDb = async () => {
  //   "use server"
  //   const newFile = await client.pdfDocument.create({
  //     data:{
  //       title: title,
  //       pdfUrl: pdfUrl,
  //       pdfAppUrl: pdfAppUrl,
  //       pdfKey: pdfKey,
  //       authorId: authorId,
  //       size: pdfSize
  //     }
      
  //   })

  //   return newFile;
  // }


  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          setTitle(res[0].name);
          setPdfKey(res[0].key);
          setPdfUrl(res[0].url);
          setPdfAppUrl(res[0].appUrl)
          setAuthorId(res[0].serverData.uploadedBy);
          setPdfSize(res[0].size);
          
          
          console.log("Files: ", res);
          console.log("typeof authorId: ", typeof(res[0].serverData.uploadedBy))
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      <button onClick={async () => {
        // console.log("title: ", title);
        // console.log("pdfKey: ", pdfKey);
        // console.log("pdf url: ", pdfUrl);
        // console.log("pdfAppUrl: ", pdfAppUrl);
        // console.log("authorid: ", authorId);

        const dbRes = await addPdfToDb(title, pdfKey, pdfUrl, pdfAppUrl, authorId, pdfSize );
      }}>Show details & add file</button>
    </main>
  );
}





// "use client"

// import { UploadButton } from "@/utils/uploadthing"

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <UploadButton
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {
//           // Do something with the response
          
//           console.log("Files: ", res);
//           alert("Upload Completed");
//         }}
//         onUploadError={(error: Error) => {
//           // Do something with the error.
//           alert(`ERROR! ${error.message}`);
//         }}
//       />
//     </main>
//   );
// }


/*
[23:46:45.101] INFO (#16) handleUploadAction=26ms: Sending presigned URLs to client
  presignedUrls: [
    {
      url: 'https://sea1.ingest.uploadthing.com/QHWVkOc63xDRNJAf7q3jRf5zksmTVrq2GFEWBuU6D839d1X7?expires=1735672605093&x-ut-identifier=omia6ie4wa&x-ut-file-name=pxfuel.jpg&x-ut-file-size=106121&x-ut-file-type=image%252Fjpeg&x-ut-slug=imageUploader&x-ut-content-disposition=inline&signature=hmac-sha256%3D8ac1859669b3ff5667a75f8a3d770eef53f1f503ef1fdf4476db608f3936bcf5',
      key: 'QHWVkOc63xDRNJAf7q3jRf5zksmTVrq2GFEWBuU6D839d1X7',
      name: 'pxfuel.jpg',
      customId: null
    }
  ]
*/


/**
 * [
    {
        "name": "pxfuel.jpg",
        "size": 106121,
        "key": "QHWVkOc63xDRS8DASbKRXdzseGqCTpjVoQmgZDYUIJ0y3lAB",
        "lastModified": 1735206177415,
        "serverData": {
            "uploadedBy": "3",
            "fileUrl": "https://utfs.io/f/QHWVkOc63xDRS8DASbKRXdzseGqCTpjVoQmgZDYUIJ0y3lAB",
            "fileKey": "QHWVkOc63xDRS8DASbKRXdzseGqCTpjVoQmgZDYUIJ0y3lAB",
            "fileSize": 106121,
            "fileAppUrl": "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRS8DASbKRXdzseGqCTpjVoQmgZDYUIJ0y3lAB"
        },
        "url": "https://utfs.io/f/QHWVkOc63xDRS8DASbKRXdzseGqCTpjVoQmgZDYUIJ0y3lAB",
        "appUrl": "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRS8DASbKRXdzseGqCTpjVoQmgZDYUIJ0y3lAB",
        "customId": null,
        "type": "image/jpeg",
        "fileHash": "7298c707f3112ab8b419b5ece8bddfd3"
    }
]
 */



/**
 * [
    {
        "name": "amoled-abstract-3840x2160-16833.jpg",
        "size": 1142716,
        "key": "QHWVkOc63xDRl0yhCKkZqKpW9Tx0mgSnMd3wiYXcoNGz67re",
        "lastModified": 1734168540508,
        "serverData": {
            "uploadedBy": "3"
        },
        "url": "https://utfs.io/f/QHWVkOc63xDRl0yhCKkZqKpW9Tx0mgSnMd3wiYXcoNGz67re",
        "appUrl": "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRl0yhCKkZqKpW9Tx0mgSnMd3wiYXcoNGz67re",
        "customId": null,
        "type": "image/jpeg",
        "fileHash": "9e33ca9ac79ef47b7dd19b840d664504"
    }
]
 */