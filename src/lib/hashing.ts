import bcrypt from "bcryptjs";

export default (raw: string) => {
  return bcrypt.genSalt(12).then((salt) => {
    return bcrypt.hash(raw, salt).then((hash: string) => {
      return hash;
    });
  });
};

export const checkHash = (raw: string, hash: string) => {
  return bcrypt.compare(raw, hash).then((equal) => {
    return equal;
  });
};
