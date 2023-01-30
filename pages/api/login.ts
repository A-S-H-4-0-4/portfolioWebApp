import HttpStatus from "http-status-codes";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createHmac } from "crypto";
import getSession from "../../middleware/sessionTokenMiddleware";
import bcrypt from "bcrypt";
interface ResponseType {
  message: string;
  data: {};
  errors: Array<{}>;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await getSession(req);
  const { method } = req;
  if (method === "POST") {
    let responseObject: ResponseType;
    try {
      let { phoneNumber, password } = req.body;
      const result = await prisma.user.findFirst({
        where: {
          phoneNumber: (phoneNumber === undefined || phoneNumber === null) ? "" : phoneNumber,
        }
      });
      let valid: boolean = false
      if ((typeof password === "string" && password !== "") && result !== null) {
        await bcrypt
          .compare(password, result.password)
          .then(
            res => { valid = res }
          ).catch(error => console.error(error.message))
      };
      console.log(`this is  ${valid}`);
      if (valid && result !== null) {
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
        });
        responseObject = {
          message: "success",
          data: { "sessionKey": session.sessionToken },
          errors: [],
        };
      } else if (result === null) {
        responseObject = {
          message: "failed",
          data: {},
          errors: [{ error: "User Does not Exit with these credential." }],
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
      console.log(e);
      let errorMessage: string = "Already Exist";
      response.errors.push({ error: errorMessage });
      res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }
};