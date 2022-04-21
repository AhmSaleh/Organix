import UserService from "../services/UserService";
import { Request, Response } from 'express';

const {ajv} = require("../Utils/validate");
const jwt = require("jsonwebtoken");

const UserModel = require("../Model/UserModel");

class UserController{
    static postLogin = postLogin;
    static postRegister = postRegister;
    static getAll = getAll;
    static getProfile = getProfile;
}

async function postLogin(req:Request,res:Response){
    const user = req.body;
    
    const validate = ajv.getSchema("userLogin");
    const valid = validate(user);
    // check the validation
    if(!valid) return res.status(400).send(validate.errors);
    // check the user exist
    
    const userExist = await UserService.getUserByEmail(user.email);
    if(!userExist) return res.status(401).send("failed to login");
    // check the password
    const isPasswordCorrect = await UserService.comparePassword(user.password,userExist.hash);
    if(!isPasswordCorrect) return res.status(401).send("failed to login");
    
    const tokenPayload = {
        UserId:user.email,
        adminRole:true
    };
    console.log("load: ")
    console.log(tokenPayload)
    var Token = await jwt.sign(tokenPayload ,"thisistokensecret");
    console.log("userToken: "+Token)
    res.header("x-auth-token",Token)
    // login success
    res.send("Login success");
}

async function postRegister(req:Request,res:Response){
    const user = req.body;
    console.log(user)
    const validate = ajv.getSchema("userRegestraion");
    const valid = validate(user);
    
    // check the validation
    if(!valid) return res.status(400).send(validate.errors);
    // check the user exist
    
    const userExist = await UserService.getUserByEmail(user.email);
    if(userExist) return res.status(400).send("Email already exist");
    // register success
    const newUser = await UserService.createUser(user);
    res.send(newUser);

}

async function getAll(req:Request,res:Response){
    
    const users = await UserService.getAllUsers();
    res.send(users);
}

async function getProfile(req:Request,res:Response){
    
    const user = await UserService.getUserByEmail(req.params.email);
    res.send(user);
}

export default UserController;