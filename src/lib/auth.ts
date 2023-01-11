import Iron from "@hapi/iron";
import { v4 as uuidv4 } from "uuid";

import AuthToken from "src/models/authtokens";

// Check auth and temp tokens, regenerate if needed
export default async function generateNewTokens(
  userId: string,
  username: string,
  authorization: number,
  email: string
) {
  const authToken = await generateAuthToken(userId);
  const tempToken = await generateTempToken({ username, authorization, email });

  return { authToken, tempToken };
}

export async function generateTempToken(user: {
  username: string;
  authorization: number;
  email: string;
}) {
  const tempToken = {
    ...user,
    // 5 minutes expiration time
    eat: (() => Date.now() + 5 * 60 * 1000)(),
  };
  let sealed;
  try {
    sealed = await Iron.seal(
      tempToken,
      process.env.TEMP_TOKEN_SECRET!,
      Iron.defaults
    );
  } catch (error) {
    console.debug(error);
    return;
  }

  return sealed;
}

export async function readTempToken(token: any, secret: string) {
  return await Iron.unseal(token, secret, Iron.defaults);
}

export async function generateAuthToken(userId: string) {
  const authToken = await new AuthToken({
    key: uuidv4(),
    userId: userId,
  }).save();

  return authToken._id.toString();
}

export async function deleteAuthToken(key: string) {
  return await AuthToken.deleteOne({ key: key });
}
