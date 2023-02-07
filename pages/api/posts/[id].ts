import HttpStatus from "http-status-codes";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
interface ResponseType {
    message: string;
    data: {};
    errors: Array<{}>;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method,query } = req;
    const { id } = query //id=phoneNumber
    const queryid: string = id.toString();
    console.log(queryid)
    if (method === "GET") {
        let responseObject: ResponseType;
        try {
            const result = await prisma.project.findMany({
                where: {
                    user:{
                        phoneNumber:{equals:queryid}
                    }
                },
                select: {
                    id:true,
                    title: true,
                    thumbnailurl: true,
                    videoUrl: true,
                    date: true,
                    description:true,
                    projectLink:true,
                },orderBy:{
                    date:'desc'
                }
            });

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
            res.status(HttpStatus.BAD_REQUEST).json(responseObject);
        }
    }
};
