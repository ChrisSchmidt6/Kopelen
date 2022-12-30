import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbMiddleware from "./db";

export default nextConnect<NextApiRequest, NextApiResponse>().use(dbMiddleware);
