import Ajv from "ajv";
const addFormats = require("ajv-formats");

import regester_admin from "./SchemaRegester";
import regester_user from "./SchemaRegesterForUser";
import update_user from "./SchemaUpdateUser";
import update_user_by_admin from "./SchemaUpdateUserByAdmin";
import login_user from "./SchemaLogin";
import product_crud from "./Schema.Product";
import category_schema from "./SchemaCategory";

const ajv = (exports.ajv = new Ajv());
addFormats(ajv);

ajv.addSchema(regester_user, "userRegestraion");
ajv.addSchema(regester_admin, "RegestraionByAdmin");
ajv.addSchema(update_user, "SchemaUpdateUser");
ajv.addSchema(update_user_by_admin,"SchemaUpdateUserByAdmin");
ajv.addSchema(login_user, "userLogin");
ajv.addSchema(category_schema, "category");
ajv.addSchema(product_crud, "product");

export default ajv;
