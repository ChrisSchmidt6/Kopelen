import { v4 as uuidv4 } from "uuid";

import User from "src/models/users";
import AccessKey from "src/models/accesskeys";
import hash, { checkHash } from "src/lib/hashing";

export default async (email: string, username: string, password: string) => {
  return await new User({
    email,
    username,
    password: await hash(password),
  }).save();
};

export async function findUser(username?: string, email?: string) {
  return await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
}

export async function deleteUser(id: string) {
  return await User.deleteOne({ _id: id });
}

export async function checkPassword(username: string, password: string) {
  const user = await User.findOne({ username: username });
  return await checkHash(password, user.password);
}

export async function updateUsername(username: string, newUsername: string) {
  return await User.updateOne(
    { username: username },
    { $set: { username: newUsername } }
  );
}

export async function checkAccessKeyValidity(key: string) {
  const accessKey = await AccessKey.findOne({ key: key });
  return accessKey.valid;
}

export async function useAccessKey(key: string, username: string) {
  return await AccessKey.updateOne(
    { key: key },
    { $set: { usedBy: username, valid: false } }
  );
}

export async function createAccessKey(key: string) {
  return await new AccessKey({
    key: uuidv4(),
  }).save();
}
