import type { NextApiRequest, NextApiResponse } from "next";
import AuthorizeUser from "src/middleware/auth";
import handler from "src/middleware/handler";

export default handler
  .use(AuthorizeUser)
  .get((req: NextApiRequest, res: NextApiResponse, next: any) => {
    console.log("yo");
    res.status(200).json({ success: true });
  });
