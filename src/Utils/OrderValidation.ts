// import Ajv,{JSONSchemaType} from "ajv"
//import { IOrder } from "../model/OrderModel"
import addFormats from "ajv-formats"
import OrderSchema from "./SchemaOrder.json"
import Ajv from "ajv"

const ajv = new Ajv()
addFormats(ajv)
export default ajv.compile(OrderSchema)
