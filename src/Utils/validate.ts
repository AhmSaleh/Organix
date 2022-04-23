const Ajv = require("ajv");
const addFormats = require("ajv-formats");

import regester_admin from "./SchemaRegester" 
import regester_user from "./SchemaRegesterForUser"
const login_user = require("./SchemaLogin.json");
const post_post = require("./SchemaPost.json");
const product_crud = require("./Schema.Product.json");

const ajv = (exports.ajv = new Ajv());
addFormats(ajv);

ajv.addSchema(regester_user, "userRegestraion");
ajv.addSchema(regester_admin, "RegestraionByAdmin");
ajv.addSchema(login_user, "userLogin");
ajv.addSchema(post_post, "post");
ajv.addSchema(product_crud, "product");

export default ajv;