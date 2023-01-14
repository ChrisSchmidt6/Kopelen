import type { NextApiRequest, NextApiResponse } from "next";
import { parse, serialize } from "cookie";

import AuthToken from "src/models/authtokens";
import handler from "src/middleware/handler";

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = parse(req.headers.cookie || "");

    try {
      const authToken = await AuthToken.findOne({
        key: cookies["auth-token"] || "",
      });

      if (authToken && authToken.key)
        await AuthToken.deleteOne({ key: authToken.key });

      res.setHeader("Set-Cookie", serialize("auth-token", "", { maxAge: 0 }));
      res.status(200).json({ success: true });
    } catch (error) {
      console.debug(error);
      res.status(500).json({ success: false });
    }
  }
);
