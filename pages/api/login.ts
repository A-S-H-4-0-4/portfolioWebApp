import HttpStatus from "http-status-codes";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createHmac } from "crypto";
import getSession from "../../middleware/sessionTokenMiddleware";


interface ResponseType {
  message: string;
  data: {};
  errors: Array<{}>;
}


// export default handler;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await getSession(req);

  const { method } = req;

  if (method === "GET") {

  } else if (method === "POST") {
    let responseObject: ResponseType;

    try {
      const body = req.body;
      let { phoneNumber, password } = body;
      console.log(body);
      
      const result = await prisma.user.findFirst({
        where: {
          phoneNumber: (phoneNumber === undefined || phoneNumber === null) ? "" : phoneNumber,
          password: (password === undefined || password === null) ? "" : password,
        },
      });
      console.log(result);

      if (result !== null) {
        const date = new Date()
        date.setDate(new Date().getDate() + 7)
        console.log(date);

        const sessionKey: string = createHmac('sha256', result['id'] + phoneNumber).update(new Date().toString()).digest('hex')
        const session = await prisma.session.create({
          data: {
            sessionToken: sessionKey,
            expires: date,
            user: {
              connect: {
                id: result['id']
              }
            }
          }
        })

        responseObject = {
          message: "success",
          data: { "sessionKey": session.sessionToken },
          errors: [],
        };

      } else {
        responseObject = {
          message: "failed",
          data: {},
          errors: [{ error: "email id or password not valid" }],
        };
      }

      res.status(HttpStatus.OK).json(responseObject);
    } catch (e: any) {
      const response: ResponseType = {
        message: "failed",
        data: {},
        errors: [],
      };
      // console.log(error.message);

      let errorMessage: string = "Already Exist";
      if ((e.code = "P2002")) {
        const { meta } = e;
        const { target } = meta;

        errorMessage = `${target} ${errorMessage}`;
      } else {
        errorMessage = e.message
      }

      response.errors.push({ error: errorMessage });

      res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  } else if (method === "PUT") {
  } else if (method === "DELETE") {
  }
};

