import HttpStatus from "http-status-codes";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
interface ResponseType {
    message: string;
    data: {};
    errors: Array<{}>;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    const { phoneNo } = body;
    const user = await prisma.user.findUnique({
        where: {
            phoneNumber: phoneNo
        },
        select: {
            id: true
        }
    });
    if (user.id !== null) {
        if (method === "GET") {
            let responseObject: ResponseType;
            try {
                const result = await prisma.visitors.count(
                    {
                        where: {
                            phoneNo: phoneNo
                        }
                    }
                );
                responseObject = {
                    message: "success",
                    data: { data: { visitors: result } },
                    errors: [],
                };
                console.log(result);
                res.status(HttpStatus.OK).json(responseObject);
            } catch (error) {
                console.log(error);
                responseObject = {
                    message: "failed",
                    data: {},
                    errors: [{ errorMessage: error }],
                };
                res.status(HttpStatus.BAD_REQUEST).json(responseObject)
            }
        } else if (method === "POST") {
            let responseObject: ResponseType
            try {
                let { phoneNo, iP } = body
                const result = await prisma.visitors.create({
                    data: {
                        phoneNo: phoneNo,
                        iP: iP,
                        user: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                });
                console.log(result);
                responseObject = {
                    errors: [],
                    data: { "data": result },
                    message: "success"
                }
                res.status(HttpStatus.OK).json(responseObject)
            } catch (error) {
                console.log(error);
                responseObject = {
                    message: "failed",
                    data: {},
                    errors: [{ errorMessage: error }],
                };
                res.status(HttpStatus.BAD_REQUEST).json(responseObject)
            }
        }
    }
};