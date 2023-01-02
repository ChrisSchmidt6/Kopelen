import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

declare global {
  var mongoose: any;
}

export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  try {
    if (!global.mongoose) {
      const opts = {
        bufferCommands: false,
      };
      global.mongoose = await mongoose.connect(process.env.MONGODB_URI!, opts);
    }
  } catch (error) {
    console.error(error);
  }

  return next();
};
