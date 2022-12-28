import type { NextApiRequest, NextApiResponse } from "next";
import { Schema } from "mongoose";
import { object, ref, string } from "yup";

import handler from "src/lib/handler";
import validate from "src/lib/middleware/validation";
import dbConnect from "src/lib/db";
import hash from "src/lib/hashing";
import AccessKey from "src/models/accesskeys";
import User from "src/models/users";

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

const register = handler.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, email, password, confirmPassword, accessKey } = req.body;
    await dbConnect();

    AccessKey.findOne(
      { key: accessKey },
      (err: any, key: { expiration: Date }) => {
        if (err) return res.status(500).json({ success: false });

        if (!key)
          return res.status(500).json({
            success: false,
            message: "Access key is invalid or has expired",
          });

        if (Date.now() > key.expiration.getTime()) {
          AccessKey.deleteOne({ key: accessKey });
          return res.status(500).json({
            success: false,
            message: "Access key is invalid or has expired",
          });
        }

        User.findOne(
          { $or: [{ username: username }, { email: email }] },
          async (err: any, user: { email: string }) => {
            if (err) return res.status(500).json({ success: false });
            if (user) {
              return res.status(500).json({
                success: false,
                message:
                  "Either the username or email specified is already in use",
              });
            } else {
              try {
                const user = new User({
                  email: email,
                  username: username,
                  password: await hash(password),
                });

                await user.save();

                res.status(200).json({ success: true });
              } catch (err) {
                res.status(400).json(err);
              }
            }
            return;
          }
        ).collation({ locale: "en", strength: 2 });
      }
    );
  }
);

export default validate(validationSchema, register);
