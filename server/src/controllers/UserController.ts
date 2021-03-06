import UserService from "../services/UserService";
import { Request, Response } from "express";
import envconf from "../envconf";

import jwt from "jsonwebtoken";
import { IRegesterData } from "../Utils/SchemaRegester";
import { RoleEnum } from "../model/UserModel";
import { ILoginData } from "../Utils/SchemaLogin";
import { RequestWithSchema } from "../middleware/validation";
import { Types } from "mongoose";
import { RequestWithAuth } from "../middleware/authentication";
import path from "path";
import ajv from "../Utils/validate";
import { IRegesterDataForUserByAdmin } from "../Utils/SchemaUpdateUserByAdmin";

export interface ITockeBayload {
  UserId: Types.ObjectId;
  role: RoleEnum;
}
class UserController {
  static postLogin = postLogin;
  static postRegister = postRegister;
  static getAll = getAll;
  static getProfile = getProfile;
  static getMerchant = getMerchant;
  static getPFP = getPFP;
  static getAddresses = getAddresses;
  static UPDATEUserProfileByEmail = UPDATEUserProfileByEmail;
  static GETUserById = GETUserById;
  static UPDATEUserByAdmin = UPDATEUserByAdmin;
}

async function GETUserById(req: Request, res: Response) {
  /* 	#swagger.tags = ['User'] */
  const user = await UserService.getUserByAdmin(req.params.id);
  if (user) {
     /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/regester_schema" },
      description: "User details." } */
    res.send(user);
  } else {
    res.status(404).send("Merchant not found");
  }
}

// static postRegisterPFP = registerPFP;

async function postLogin(r: Request, res: Response) {
  /* 	#swagger.tags = ['User'] */
  
  /*	#swagger.parameters['obj'] = {
          in: 'body',
          description: 'User information.',
          required: true,
          schema: { $ref: "#/definitions/login" }
  } */        
  let req = r as RequestWithSchema<ILoginData>;
  const user = req.data;
  // check the user exist
  const userExist = await UserService.getUserByEmail(user.email);
  if (!userExist) return res.status(401).send("failed to login");
  // check the password
  const isPasswordCorrect = await UserService.comparePassword(
    user.password,
    userExist.hash
  );
  if (!isPasswordCorrect) return res.status(401).send("failed to login");
  //TODO check that id work
  const tokenPayload: ITockeBayload = {
    UserId: userExist._id,
    role: userExist.role,
  };

  var Token = await jwt.sign(tokenPayload, envconf.JWT_SECRET, {
    expiresIn: envconf.jwtExpire,
  });
  // add the tocken to cookies
  res.header("Access-Control-Expose-Headers", "*");
  res.header("x-auth-token", Token);
  // login success
  /* #swagger.responses[200] = { 
      description: "User login successfully." } */
  res.send();
}

async function postRegister(r: any, res: Response) {
  /* 	#swagger.tags = ['User'] */

  /*	#swagger.parameters['obj'] = {
          in: 'body',
          description: 'User information.',
          required: true,
          schema: { $ref: "#/definitions/regester_schema" }
  } */        
  let req = r as RequestWithAuth & RequestWithSchema<IRegesterData>;
  const user = req.data;

  // check the user exist
  const userExist = await UserService.getUserByEmail(user.email);
  if (userExist) return res.status(400).send("Email already exist");
  // register success
  const newUser = await UserService.createUser(user);
  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/regester_schema" },
      description: "User login successfully." } */
  res.status(201).send(newUser);
}

async function getAll(req: Request, res: Response) {
  /* 	#swagger.tags = ['User'] */
  const users = await UserService.getAllUsers();
  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/regester_schema" },
      description: "User login successfully." } */
  res.send(users);
}

async function getProfile(r: any, res: Response) {
  /* 	#swagger.tags = ['User'] */
  let req = r as RequestWithAuth;

  const user = await UserService.getUserByEmail(req.params.email);
  if (!user) return res.status(404).send("User not found");

  if (
    req.tockenInfo.role == RoleEnum.admin ||
    user?.id == req.tockenInfo.UserId
  ) {
    /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/regester_schema" },
      description: "User login successfully." } */
    res.send(user);
  } else {
    res.status(403).send("Access Denied");
  }
}

async function getAddresses(r: any, res: Response) {
  /* 	#swagger.tags = ['User'] */
  let req = r as RequestWithAuth;

  const user = await UserService.getAddressesByEmail(req.params.email);
  if (user?.id == req.tockenInfo.UserId) {
    /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/regester_schema" },
      description: "User login successfully." } */
    res.send(user);
  } else {
    res.status(403).send("Access Denied");
  }
}

async function getMerchant(r: Request, res: Response) {
  /* 	#swagger.tags = ['User'] */
  const user = await UserService.getMerchantInfo(r.params.id);
  if (user) {
    /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/regester_schema" },
      description: "User login successfully." } */
    res.send(user);
  } else {
    res.status(404).send("Merchant not found");
  }
}

async function getPFP(r: Request, res: Response) {
  /* 	#swagger.tags = ['User'] */
  let req = r as RequestWithAuth;
  const user = await UserService.gePFPByEmail(req.params.email);

  if (
    req.tockenInfo.role == RoleEnum.admin ||
    user?.id == req.tockenInfo.UserId
  ) {
    const imgPath = "../../" + user?.img;
    res.sendFile(path.join(__dirname, imgPath));
  } else {
    res.status(403).send("Access Denied");
  }
}
async function UPDATEUserProfileByEmail(r: Request, res: Response) {
  /* 	#swagger.tags = ['User'] */
  let req = r as RequestWithAuth;

  try {
    const user = await UserService.getUserByEmail(req.params.email);
    if (!user) res.status(401).send();
    if (
      user?.id !== req.tockenInfo.UserId ||
      req.tockenInfo.role == RoleEnum.admin
    )
      res.status(403).send("Access Denied");

    const validate = ajv.getSchema("SchemaUpdateUser");
    const valid = validate!(req.body);
    if (!valid) return res.status(400).send();

    await UserService.updateUserProfile(req.params.email, req.body);
    res.status(201).send();
  } catch (err) {
    res.status(500).send(err);
  }
}

async function UPDATEUserByAdmin(r: Request, res: Response) {
  /* 	#swagger.tags = ['User'] */
  let req = r as RequestWithAuth &
    RequestWithSchema<IRegesterDataForUserByAdmin>;
  const user = req.data;
  try {
    await UserService.updateUserProfile(req.params.email, user);
    res.status(201).send();
  } catch (err) {
    res.status(500).send(err);
  }
}
export default UserController;
