import { Schema, model } from "mongoose";

import { UserDocument, UserSchema, UserModel } from "common";

const UserSchema: UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
});

export const User: UserModel = model<UserDocument, UserModel>(
  "User",
  UserSchema
);

/* IUser = UserDocument or UserObject*/
