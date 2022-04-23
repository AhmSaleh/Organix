


import mongoose from "mongoose";
import bcrypt from "bcrypt";
import conf from "../conf";
import {IUser} from "../model/UserModel";
import { IRegesterData } from "../Utils/SchemaRegester";



class UserService {

    async createUser(user: IRegesterData) {
        const hash = await bcrypt.hash(user.password, conf.SaltRounds);
        return await mongoose.model('User').create({
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

    async getAllUsers() {
        return await mongoose.model('User').find({});
    };

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    };
}

export default new UserService();