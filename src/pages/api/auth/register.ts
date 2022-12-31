import type { NextApiRequest, NextApiResponse } from "next";
import { object, ref, string } from "yup";

import handler from "src/middleware/handler";
import validate from "src/middleware/validation";
import createUser, {
  checkAccessKeyValidity,
  findUser,
  useAccessKey,
} from "src/lib/user";

const validationSchema = object().shape({
  username: string()
    .required("Username is a required field.")
    .min(3, "Your username must contain at least 3 characters")
    .max(20, "Your username can contain at most 20 characters"),
  email: string()
    .required("Email is a required field.")
    .email("You must enter a valid email."),
  password: string()
    .required("Password is a required field.")
    .min(8, "Your password must contain at least 8 characters")
    .max(25, "Your password can contain at most 25 characters"),
  confirmPassword: string()
    .required("Confirm Password is a required field.")
    .oneOf([ref("password")], "The password you provided does not match."),
  accessKey: string()
    .required("Access Key is a required field.")
    .max(50, "Your access key can contain at most 50 characters"),
});

const register = handler
  .use(validate(validationSchema))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, email, password, confirmPassword, accessKey } = req.body;

    const keyIsValid = await checkAccessKeyValidity(accessKey);

    if (!keyIsValid)
      return res.status(500).json({
        success: false,
        message: "Access key is invalid",
      });

    const existingUser = await findUser(username, email);

    if (existingUser)
      return res.status(500).json({
        success: false,
        message: "Either the username or email specified is already in use",
      });

    try {
      await createUser(email, username, password);
      await useAccessKey(accessKey, username);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json(error);
    }
  });

export default register;
