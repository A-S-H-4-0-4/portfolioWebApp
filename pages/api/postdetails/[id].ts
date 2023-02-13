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

    const { id } = query
    const queryid: string = id.toString();
    if (method === "GET") {
        let responseObject: ResponseType;
        try {
            const result = await prisma.project.findFirst({
                where: {
                    id: queryid,
                },
                select: {
                    title: true,
                    thumbnailurl: true,
                    videoUrl: true,
                    date: true,
                    description: true,
                    projectLink:true,
                    techStack: {
                        select: {
                            type: true,
                            content: true,
                        },
                        orderBy: {
                            createdAt: "desc"
                        }
                    },
                    projectContent: {
                        select: {
                            type: true,
                            content: true,
                        },
                        orderBy: {
                            createdAt: "desc"
                        }
                    }
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
