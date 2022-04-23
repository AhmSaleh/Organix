import UserService from "../services/UserService";
import { Request, Response } from 'express';
import conf from "../conf";

import jwt from "jsonwebtoken";
import { IRegesterData } from "../Utils/SchemaRegester";
import { RoleEnum } from "../model/UserModel";
import { ILoginData } from "../Utils/SchemaLogin";
import { RequestWithSchema } from "../middleware/validation";
import { Types } from "mongoose"
import { RequestWithAuth } from "../middleware/authentication";


export interface ITockeBayload {
    UserId: Types.ObjectId,
    role: RoleEnum
}
class UserController {
    static postLogin = postLogin;
    static postRegister = postRegister;
    static getAll = getAll;
    static getProfile = getProfile;
}

async function postLogin(r: Request, res: Response) {
    let req = r as RequestWithSchema<ILoginData>;
    const user = req.data;
    // check the user exist
    const userExist = await UserService.getUserByEmail(user.email);
    if (!userExist) return res.status(401).send("failed to login");
    // check the password
    const isPasswordCorrect = await UserService.comparePassword(user.password, userExist.hash);
    if (!isPasswordCorrect) return res.status(401).send("failed to login");
    //TODO check that id work
    const tokenPayload: ITockeBayload = {
        UserId: userExist._id,
        role: userExist.role
    };

    var Token = await jwt.sign(tokenPayload, conf.JWT_SECRET, { expiresIn: conf.jwtExpire });
    // add the tocken to cookies
    res.header("x-auth-token", Token)
    // login success
    res.send("Login success");
}

async function postRegister(r: any, res: Response) {
    let req = r as RequestWithAuth & RequestWithSchema<IRegesterData>;
    const user = req.data;

    // check the user exist
    const userExist = await UserService.getUserByEmail(user.email);
    if (userExist) return res.status(400).send("Email already exist");
    // register success
    const newUser = await UserService.createUser(user);
    res.status(201).send(newUser);

}

async function getAll(req: Request, res: Response) {

    const users = await UserService.getAllUsers();
    res.send(users);
}

async function getProfile(r: any, res: Response) {
    let req = r as RequestWithAuth;

    const user = await UserService.getUserByEmail(req.params.email);

    if (req.tockenInfo.role == RoleEnum.admin || user?.id == req.tockenInfo.UserId) {
        res.send(user);
    }
    else {
        res.status(403).send("Access Denied");
    }
}

export default UserController;
