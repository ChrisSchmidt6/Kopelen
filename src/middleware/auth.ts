import { NextApiRequest, NextApiResponse } from "next";
import { readTempToken } from "src/lib/auth";

export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  const bearerToken = req.headers["authorization"]?.split(" ")[1];

  const tempToken = await readTempToken(
    bearerToken || "",
    process.env.TEMP_TOKEN_SECRET!
  );

  console.debug({ currentDate: Date.now(), expires: tempToken.eat });

  if (tempToken && Date.now() <= tempToken.eat) {
    // temp token is valid, continue to next middleware or API
    return next();
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Client must sign in to an account" });
  }
};
