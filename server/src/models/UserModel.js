import pkg from "mongoose";
import shortid from "shortid";
import { hashPassword } from "../helper/helper.js";

const { Schema, model } = pkg;

const UserSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  salt: String,
});

UserSchema.pre("save", function (next) {
  if (!this.salt) {
    this.salt = shortid.generate();
  }

  if (this.password) {
    this.password = hashPassword(this.password, this.salt);
  }

  next();
});

const UserModel = new model("user", UserSchema);

export default UserModel;
