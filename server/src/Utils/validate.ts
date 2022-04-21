const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const regester_user = require("./SchemaRegester.json")
const login_user = require("./SchemaLogin.json")
const post_post = require("./SchemaPost.json")

const ajv = exports.ajv = new Ajv()
addFormats(ajv)

ajv.addSchema(regester_user, "userRegestraion")
ajv.addSchema(login_user, "userLogin")
ajv.addSchema(post_post, "post")

