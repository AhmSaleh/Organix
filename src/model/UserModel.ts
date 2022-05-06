import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  hash: string;
  name: string;
  role: RoleEnum;
  phone: string;
  img: string;
  addresses: string[];
}

export enum RoleEnum {
  user = "user",
  merchant = "merchant",
  admin = "admin",
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  name: {
    first: {
      type: String,
      required: true,
      minlength: [1, "is too short (minimum is 1 characters)"],
    },
    last: {
      type: String,
      required: true,
      minlength: [1, "is too short (minimum is 1 characters)"],
    },
  },
  role: {
    type: String,
    enum: Object.values(RoleEnum),
    default: RoleEnum.user,
  },
  phone: {
    type: String,
    match: [/^01[0125][0-9]{8}$/, "is invalid"],
  },
  img: {
    type: String,
  },
  addresses: {
    type: [String],
  },
});

//export the model and the schema
const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
