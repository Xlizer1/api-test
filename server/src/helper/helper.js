import crypto from "crypto";

const hashPassword = (password, salt) => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

export { hashPassword };
