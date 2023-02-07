import HttpStatus from "http-status-codes";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
interface ResponseType {
    message: string;
    data: {};
    errors: Array<{}>;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;
    const { id } = query //phoneNumber
    const queryid: string = id.toString();
    if (method === "GET") {
        let responseObject: ResponseType;
        try {
            const result = await prisma.userProfile.findFirst(
                {
                    where: {
                        user:{
                            phoneNumber:queryid
                        }
                    },
                    select: {
                        userImage: true,
                        bannerImage: true,
                        emailAddress: true,
                        gitHub: true,
                        gitLab: true,
                        instaGram: true,
                        linkedIn: true,
                        resume: true,
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        },
                    }
                }
            );
            responseObject = {
                message: "success",
                data: { data: result },
                errors: [],
            };
            console.log(result);
            res.status(HttpStatus.OK).json(responseObject);
        } catch (error) {
            console.log(error);
            responseObject = {
                message: "faild",
                data: {},
                errors: [{ errorMessage: "error occured will processing the request" }],
            };
            res.status(HttpStatus.CONFLICT).json(responseObject);
        }

    }

};