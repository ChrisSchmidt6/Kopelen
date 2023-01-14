import type { NextApiRequest, NextApiResponse } from "next";
import AuthorizeUser from "src/middleware/auth";
import handler from "src/middleware/handler";

export default handler
  .use(AuthorizeUser)
  .get((req: NextApiRequest, res: NextApiResponse) => {
    console.log("protected call");
    res.status(200).json({ success: true });
  });
