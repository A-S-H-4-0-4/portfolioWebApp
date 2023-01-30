import HttpStatus from "http-status-codes";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
interface ResponseType {
    message: string;
    errors: Array<{}>;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method === "POST") {
        let responseObject: ResponseType;
        try {
            const saltRound: number = 10;
            const body = req.body;
            let { email, password, name, phoneNumber } = body;
            console.log(body);
            //HashIng Password
            let hashPwd: string = ""
            await bcrypt
                .genSalt(saltRound)
                .then(salt => { return bcrypt.hash(password, salt) }).
                then(hash => {  hashPwd = hash });
        //Data Save
                await prisma.user.create({
                data: {
                    name: name,
                    phoneNumber,
                    email: email,
                    password: hashPwd,
                }
            });
            responseObject = {
                message: "success",
                errors: []
            }
            res.status(HttpStatus.OK).json(responseObject)
        } catch (error) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    responseObject = {
                        message: "failed",
                        errors: [{ 'errorMessage': "Phone NO. Or Email already Register." }]
                    }
                    res.status(HttpStatus.CONFLICT).json(responseObject)
                }
            } else {
                responseObject = {
                    message: "failed",
                    errors: [{ 'errorMessage': "problem in signing in" }]
                }
                res.status(HttpStatus.BAD_REQUEST).json(responseObject)
            }
        }
    }
};