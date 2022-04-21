const { ajv } = require("../Utils/validate");
const jwt = require("jsonwebtoken");

const UserModel = require("../Model/UserModel");

async function postLogin(req, res) {
  const user = req.body;

  const validate = ajv.getSchema("userLogin");
  const valid = validate(user);
  // check the validation
  if (!valid) return res.status(400).send(validate.errors);
  // check the user exist
  const userModel = new UserModel();
  const userExist = await userModel.getUserByEmail(user.email);
  if (!userExist) return res.status(401).send("failed to login");
  // check the password
  const isPasswordCorrect = await userModel.comparePassword(
    user.password,
    userExist.hash
  );
  if (!isPasswordCorrect) return res.status(401).send("failed to login");

  tokenPayload = {
    UserId: user.email,
    adminRole: true,
  };
  console.log("load: ");
  console.log(tokenPayload);
  var Token = await jwt.sign(tokenPayload, "thisistokensecret");
  console.log("userToken: " + Token);
  res.header("x-auth-token", Token);
  // login success
  res.send("Login success");
}

async function postRegister(req, res) {
  const user = req.body;
  console.log(user);
  const validate = ajv.getSchema("userRegestraion");
  const valid = validate(user);

  // check the validation
  if (!valid) return res.status(400).send(validate.errors);
  // check the user exist
  const userModel = new UserModel();
  const userExist = await userModel.getUserByEmail(user.email);
  if (userExist) return res.status(400).send("Email already exist");
  // register success
  const newUser = await userModel.createUser(user);
  res.send(newUser);
}

async function getAll(req, res) {
  const userModel = new UserModel();
  const users = await userModel.getAllUsers();
  res.send(users);
}

async function getProfile(req, res) {
  const userModel = new UserModel();
  const user = await userModel.getUserByEmail(req.params.email);
  res.send(user);
}

module.exports = {
  postLogin,
  postRegister,
  getAll,
  getProfile,
};
