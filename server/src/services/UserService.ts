import mongoose from "mongoose";
import bcrypt, { compareSync } from "bcrypt";
import envconf from "../envconf";
import UserModel, { IUser, RoleEnum } from "../model/UserModel";
import { IRegesterData } from "../Utils/SchemaRegester";
import fs from "fs";
import CartService from "./CartService";

class UserService {
  async createUser(user: IRegesterData) {
    const hash = await bcrypt.hash(user.password, envconf.SaltRounds);
    let newUser = await mongoose.model<IUser>("User").create({
      email: user.email,
      hash: hash,
      name: user.name,
      role: user.role,
      phone: user.phone,
      img: user.img,
      addresses: user.addresses,
    });

    CartService.addCart(newUser._id.toString());

    return newUser;
  }

  async getUserByEmail(email: string) {
    return await mongoose.model<IUser>("User").findOne({
      email: email,
    });
  }
  async gePFPByEmail(email: string) {
    return await mongoose.model<IUser>("User").findOne({
      email: email,
    });
  }

  async getMerchantInfo(id: string) {
    return await mongoose.model<IUser>("User").findOne(
      {
        _id: id,
        role: RoleEnum.merchant,
      },
      {
        name: 1,
        email: 1,
        role: 1,
      }
    );
  }

  async getUserByAdmin(id: string) {
    return await UserModel.find({ _id: id });
  }

  async getAllUsers() {
    return await mongoose.model<IUser>("User").find({});
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async updateUserPassword(email: string, password: string) {
    const hash = await bcrypt.hash(password, envconf.SaltRounds);
    await mongoose.model<IUser>("User").updateOne(
      {
        email: email,
      },
      {
        hash: hash,
      }
    );
  }

  async updateUserProfile(email: string, obj: any) {
    const user = await UserModel.findOneAndUpdate({ email: email }, obj, {
      runValidators: true,
      new: false,
    });

    if (obj.img) {
      fs.unlink(user?.img || "", () => {
        console.log("File Removed");
      });
    }
  }

  async getAddressesByEmail(email: string) {
    return await mongoose.model<IUser>("User").findOne(
      {
        email: email,
      },
      { addresses: 1 }
    );
  }
}

export default new UserService();
