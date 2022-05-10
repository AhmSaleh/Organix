import addFormats from "ajv-formats"
import addKeywords from "ajv-keywords"
import CartSchema from "./SchemaCart.json"
import Ajv from "ajv"

const ajv = new Ajv()
addFormats(ajv)
addKeywords(ajv)
export default ajv.compile(CartSchema)