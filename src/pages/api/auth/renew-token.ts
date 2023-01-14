import { NextApiRequest, NextApiResponse } from "next";
import { parse, serialize } from "cookie";

import User from "src/models/users";
import AuthToken from "src/models/authtokens";
import generateNewTokens from "src/lib/auth";
import handler from "src/middleware/handler";

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = parse(req.headers.cookie || "");

    const authToken = await AuthToken.findOne({
      key: cookies["auth-token"] || "",
    });

    // Check whether authToken is invalid
    if (!authToken || Date.now() > authToken.expiration) {
      // Delete auth-token cookie
      res.setHeader("Set-Cookie", serialize("auth-token", "", { maxAge: 0 }));
      return res
        .status(401)
        .json({ success: false, message: "Client must sign in to an account" });
    }

    // At this point, the authToken is valid so we want to
    // regenerate both a new authToken and a new tempToken
    const user = await User.findOne({ _id: authToken.userId });

    const newTokens = await generateNewTokens(
      user._id,
      user.username,
      user.authorization,
      user.email
    );

    res.setHeader(
      "Set-Cookie",
      serialize("auth-token", newTokens.authToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        httpOnly: true,
        secure: process.env.NODE_ENV! === "production",
        path: "/",
        sameSite: "strict",
      })
    );

    await AuthToken.deleteOne({ key: authToken.key });

    res.status(200).json({
      success: true,
      tokenData: newTokens.tempToken,
    });
  }
);
