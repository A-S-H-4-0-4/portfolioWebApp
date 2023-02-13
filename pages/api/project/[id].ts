import HttpStatus from "http-status-codes";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import getSession from "../../../middleware/sessionTokenMiddleware";

interface ResponseType {
    message: string;
    data: {};
    errors: Array<{}>;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await getSession(req);

    const { method, body } = req;
    const { userId } = body;
    console.log(userId);

    if (userId !== null) {
        const { id } = req.query
        const queryid: string = id.toString();
        console.log(queryid)

        if (method === "GET") {
            let responseObject: ResponseType;
            try {
                const result = await prisma.project.findFirst(
                    {
                        where: {
                            id: queryid,
                        },
                        select: {
                            title: true,
                            thumbnailurl: true,
                            videoUrl: true,
                            date: true,
                            description: true,
                            projectLink: true,
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
                res.status(HttpStatus.BAD_REQUEST).json(responseObject);
            }
        } else if (method === "PUT") {
            let responseObject: ResponseType;
            console.log("ok");

            try {
                const body = req.body;

                let { title, description, videoUrl, thumbnailurl, techStack, projectContent, projectLink } = body;
                techStack = JSON.parse(techStack)
                projectContent = JSON.parse(projectContent);

                techStack = techStack.map((obj: any, index: number) => {
                    return {
                        type: obj["type"],
                        content: obj["content"],
                    }
                });

                projectContent = projectContent.map((obj: any, index: number) => {
                    return {
                        type: obj["type"],
                        content: obj["content"],
                        language: obj["language"],
                    }
                })
                console.log("OK");

                const result = await prisma.project.update({
                    where: {
                        id: queryid,
                    },
                    data: {
                        description,
                        title,
                        videoUrl,
                        thumbnailurl,
                        projectLink,
                        techStack: {
                            deleteMany: {
                                projectId: queryid
                            },
                            create: techStack
                        },
                        projectContent: {
                            deleteMany: {
                                projectId: queryid
                            },
                            create: projectContent
                        }
                    }
                });
                responseObject = {
                    message: "success",
                    data: result,
                    errors: [],
                };
                console.log(result);
                res.status(HttpStatus.OK).json(responseObject);

            } catch (error) {
            console.log(error);
            
                responseObject = {
                    message: "failed",
                    data: {},
                    errors: [{ errorMessage: "Error, Ocour while Saving Data!" }],
                };
                res.status(HttpStatus.CONFLICT).json(responseObject);
            }
        } else if (method === "DELETE") {
            let responseObject: ResponseType;
            try {
                const result = await prisma.$transaction([
                    prisma.projectContent.deleteMany({ where: { projectId: queryid } }),

                    prisma.techStack.deleteMany({ where: { projectId: queryid } }),

                    prisma.project.delete({ where: { id: queryid } })
                ])

                responseObject = {
                    message: "success",
                    data: { project: result },
                    errors: [],
                };
                console.log(result);
                res.status(HttpStatus.OK).json(responseObject);
            } catch (error) {
                console.log(error);
                responseObject = {
                    message: "failed",
                    data: {},
                    errors: [{ errorMessage: "Error In Deleting Project." }],
                };
                res.status(HttpStatus.CONFLICT).json(responseObject);
            }

        }
    }
};