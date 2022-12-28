import type { NextApiRequest, NextApiResponse } from "next";

let login = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    console.log("received!");
  }
  res.end();
};

export default login;
