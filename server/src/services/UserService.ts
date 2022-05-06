


import mongoose from "mongoose";
import bcrypt from "bcrypt";
import envconf from "../envconf";
import {IUser, RoleEnum} from "../model/UserModel";
import { IRegesterData } from "../Utils/SchemaRegester";



class UserService {

    async createUser(user: IRegesterData) {
        const hash = await bcrypt.hash(user.password, envconf.SaltRounds);
        return await mongoose.model<IUser>('User').create({
            email: user.email,
            hash: hash,
            name: user.name,
            role: user.role
        });
    };

    async getUserByEmail(email: string) {
        return await mongoose.model<IUser>('User').findOne({
            email: email    
        });
    };

    async getMerchantInfo(id: string) {
        return await mongoose.model<IUser>('User').findOne({
            _id: id,
            role: RoleEnum.merchant
        },
        {
            name: 1,
            email: 1,
            role: 1
        });
    }

    async getAllUsers() {
        return await mongoose.model<IUser>('User').find({});
    };

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    };
}

export default new UserService();