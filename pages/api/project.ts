import HttpStatus from "http-status-codes";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import getSession from "../../middleware/sessionTokenMiddleware";

interface ResponseType {
    message: string;
    data: {};
    errors: Array<{}>;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await getSession(req);

    const { method, body } = req;
    const { userId } = body;
    if (userId !== null) {
        if (method === "GET") {
            let responseObject: ResponseType;
            try {

                const result = await prisma.project.findMany(
                    {
                        select: {
                            title: true,
                            discription: true,
                            videoUrl: true,
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
            } catch (error) { }
        } else if (method === "POST") {
            let responseObject: ResponseType
            try {
                const { title,VideoUrl, thubnailurl, discription, techStak, projectcontent } = body
                const result = await prisma.project.create({
                    data: {
                        title: title,
                        videoUrl: VideoUrl,
                        thumbnailurl: thubnailurl,
                        discription: discription,
                        techStak: {
                            createMany: techStak
                        },
                        projectContent: {
                            createMany: projectcontent
                        },
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                });
                responseObject = {
                    errors: [],
                    data: { "data": result },
                    message: "success"
                }
                res.status(HttpStatus.OK).json(responseObject)
            } catch (error) {
                console.log(error);
                res.status(HttpStatus.BAD_REQUEST).json(responseObject)
            }

        }
    }
};
