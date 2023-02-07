import { NextApiRequest} from "next";
import prisma from "../lib/prisma";


export default async (req:NextApiRequest)=>{

    let keyObject = {...req.headers};

    // if (req.method === "GET" || req.method==="DELETE") {
    //   keyObject = { ...req.headers};
    // }
    let userId = null; // sets the files field in the request object

    let { session } = keyObject;
    session = session as string; 
    console.log(session);
    if (session && session.trim() !== "") {
      const response = await prisma.session.findUnique({
        where: {
          sessionToken: session,
        },
      });

      userId = response!==null?response["userId"]:null;
    }
    
    req.body = { ...req.body, userId: userId }; // sets the body field in the request object
    // req.files = files;


}