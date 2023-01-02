import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbMiddleware from "./db";

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use((req: NextApiRequest, res: NextApiResponse, next: any) => {
    // Make sure the correct environment variables are setup

    if (!process.env.MONGODB_URI)
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );

    if (!process.env.TEMP_TOKEN_SECRET)
      throw new Error(
        "Please define the TEMP_TOKEN_SECRET environment variable inside .env.local"
      );

    if (!process.env.NODE_ENV)
      throw new Error(
        "Please define the NODE_ENV environment variable inside .env.local"
      );

    return next();
  })
  .use(dbMiddleware);
