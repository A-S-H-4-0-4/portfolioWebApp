import HttpStatus from "http-status-codes";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import getSession from "../../middleware/sessionTokenMiddleware";
import { Console } from "console";
interface ResponseType {
    message: string;
    data: {};
    errors: Array<{}>;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    await getSession(req);
    const { method, body } = req;
    const { userId } = body;
    console.log(body);

    if (userId !== null) {
        if (method === "GET") {
            let responseObject: ResponseType;
            try {
                const result = await prisma.project.findMany(
                    {
                        where: { user: { id: userId } },
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            thumbnailurl: true,
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
                let { title, videoUrl, thumbnailurl, description, techStack, projectcontent } = body
                techStack = JSON.parse(techStack)
                console.log(projectcontent);
                console.log("i am wrong");

                projectcontent = JSON.parse(projectcontent)
                //  console.log(projectcontent);

                techStack = techStack.map((obj: any, index: number) => {
                    return {
                        type: obj["type"],
                        content: obj["content"],
                    }
                });
                console.log(techStack);
                projectcontent = projectcontent.map((obj: any, index: number) => {
                    return {
                        type: obj["type"],
                        content: obj["content"],
                        language: obj["language"],
                    }
                })
                console.log(projectcontent);
                const result = await prisma.project.create({
                    data: {
                        title: title,
                        videoUrl: videoUrl,
                        thumbnailurl: thumbnailurl,
                        description: description,
                        techStack: {
                            create: techStack
                        },
                        projectContent: {
                            create: projectcontent
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