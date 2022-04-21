import mongoose from "mongoose";
import bcrypt from "bcrypt";
import conf from "../config";
import {IUser, UserModel , UserSchema} from "../model/UserModel";

class UserService {

    async createUser(user: { password: string, email: string, name: string }) {
        const hash = await bcrypt.hash(user.password, conf.SaltRounds);
        return await mongoose.model('User').create({
            email: user.email,
            hash: hash,
            name: user.name
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