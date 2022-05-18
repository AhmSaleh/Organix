import addFormats from "ajv-formats"
import addKeywords from "ajv-keywords"
import OrderSchema from "./SchemaOrder.json"
import Ajv from "ajv"

const ajv = new Ajv()
addFormats(ajv)
addKeywords(ajv)
export default ajv.compile(OrderSchema)
