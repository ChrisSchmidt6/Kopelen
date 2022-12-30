import { NextApiRequest, NextApiResponse } from "next";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

export default (schema: OptionalObjectSchema<ObjectShape>) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: any) => {
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

    return next();
  };
};
