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
                const result = await prisma.user.findFirst(
                    {
                        where: {
                            id:userId
                        },
                        select: {
                            phoneNumber:true 
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
                let { bannerImage, userImage, instaGram, gitHub, gitLab, linkedIn, emailAddress, twitter, resume } = body;
                try {
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
                        },
                        create: {
                            bannerImage,
                            userImage,
                            instaGram,
                            gitHub,
                            gitLab,
                            
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
                    console.log(error);
                }
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