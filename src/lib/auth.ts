import Iron from "@hapi/iron";
import { v4 as uuidv4 } from "uuid";

import AuthToken from "src/models/authtokens";

// Check auth and temp tokens, regenerate if needed
export default async function generateNewTokens(user: {
  userId: string;
  username: string;
  authorization: number;
  email: string;
}) {
  if (!process.env.TEMP_TOKEN_SECRET) {
    throw new Error(
      "Please define the TEMP_TOKEN_SECRET environment variable inside .env.local"
    );
  }
  const { username, authorization, email } = user;

  const authToken = await generateAuthToken(user.userId);
  const tempToken = await generateTempToken(
    { username, authorization, email },
    authToken,
    process.env.TEMP_TOKEN_SECRET!
  );

  return { authToken, tempToken };
}

export async function generateTempToken(
  user: {
    username: string;
    authorization: number;
    email: string;
  },
  authToken: string,
  secret: string
) {
  const tempToken = {
    ...user,
    authToken,
    // 5 minutes expiration time
    eat: Date.now() + 5 * 60 * 1000,
  };
  return await Iron.seal(tempToken, secret, Iron.defaults);
}

export async function readTempToken(token: string, secret: string) {
  return await Iron.unseal(token, secret, Iron.defaults);
}

export async function generateAuthToken(userId: string) {
  const authToken = await new AuthToken({
    key: uuidv4(),
    userId: userId,
  }).save();

  return authToken._id;
}

export async function deleteAuthToken(key: string) {
  return await AuthToken.deleteOne({ key: key });
}
