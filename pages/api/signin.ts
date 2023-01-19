import HttpStatus from "http-status-codes";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


interface ResponseType {
  message: string;
  errors: Array<{}>;
}

// export default handler;

export default async (req: NextApiRequest, res: NextApiResponse) => {
//   await getSession(req);

  const { method } = req;
console.log(method);

  if (method === "GET") {
    
  } else if (method === "POST") {
    let responseObject: ResponseType;


		try {
			const body = req.body;
  
      let { email,password,name,phoneNumber } = body;
      console.log(body);
      
	  await prisma.user.create({
		data:{
			name:name,
			phoneNumber,
			email:email,
			password:password,
		}
	})	
	responseObject = {
		message:"success",
		errors : []
	}		
	res.status(HttpStatus.OK).json(responseObject) 
     	
       
		} catch (error) {
			
			responseObject={
				message:"failed",
				errors:[{'errorMessage':"problem in signing in"}]
			}
			res.status(HttpStatus.CONFLICT).json(responseObject) 
		}
   
   
   }
   else if (method === "PUT") {
  } else if (method === "DELETE") {
  }
};

