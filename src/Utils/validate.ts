import Ajv from "ajv";
const addFormats = require("ajv-formats");

import regester_admin from "./SchemaRegester" 
import regester_user from "./SchemaRegesterForUser"
import login_user from "./SchemaLogin" 
const post_post = require("./SchemaPost.json");
import product_crud from "./Schema.Product"

const ajv = (exports.ajv = new Ajv());
addFormats(ajv);

ajv.addSchema(regester_user, "userRegestraion");
ajv.addSchema(regester_admin, "RegestraionByAdmin");
ajv.addSchema(login_user, "userLogin");

ajv.addSchema(post_post, "post");
ajv.addSchema(product_crud, "product");

export default ajv;