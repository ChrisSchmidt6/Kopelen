import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

export default (
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      try {
        req.body = await schema.validate(req.body, {
          abortEarly: false,
          strict: true,
          stripUnknown: true,
        });
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    await handler(req, res);
  };
};
