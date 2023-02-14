import HttpStatus from "http-status-codes";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import getSession from "../../middleware/sessionTokenMiddleware";
import { Deserializer } from "v8";

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

                const result = await prisma.userProfile.findFirst(
                    {
                        where: {
                            userid: userId
                        },
                        select: {
                            userImage: true,
                            bannerImage: true,
                            gitHub: true,
                            gitLab: true,
                            instaGram: true,
                            linkedIn: true,
                            resume: true,
                            description: true,
                            homePageTitle: true,
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
            } catch (error) { }
        } else if (method === "PUT") {
            let responseObject: ResponseType;

            try {
                const body = req.body;
                let { bannerImage, userImage, instaGram, gitHub, gitLab, linkedIn, twitter, resume, description, homePageTitle } = body;

                const result = await prisma.userProfile.upsert({
                    where: {
                        userid: userId,
                    },
                    update: {
                        bannerImage: (bannerImage) != null ? bannerImage : undefined,
                        userImage,
                        instaGram: (instaGram) != null ? instaGram : undefined,
                        gitHub: (gitHub) != null ? gitHub : undefined,
                        gitLab: (gitLab) != null ? gitLab : undefined,
                        linkedIn: (linkedIn) != null ? linkedIn : undefined,
                        twitter: (twitter) != null ? twitter : undefined,
                        resume: (resume) != null ? resume : undefined,
                        description: (description) != null ? description : undefined,
                        homePageTitle: (homePageTitle) != null ? homePageTitle : undefined,

                    },
                    create: {
                        bannerImage,
                        userImage,
                        instaGram,
                        gitHub,
                        gitLab,
                        description,
                        homePageTitle,
                        linkedIn,
                        twitter,
                        userid: userId,
                        resume
                    }
                });
                responseObject = {
                    message: "success",
                    data: { date: result },
                    errors: [],
                };
                console.log(result);
                res.status(HttpStatus.OK).json(responseObject);


            } catch (error) {
                responseObject = {
                    message: "failed",
                    data: {},
                    errors: [{ errorMessage: "Error, Ocour while Updating profile!" }],
                };
                res.status(HttpStatus.CONFLICT).json(responseObject);
            }
        }
    }
};