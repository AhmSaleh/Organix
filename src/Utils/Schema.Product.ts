import { JSONSchemaType } from "ajv"
import { IProduct } from "../model/Product.Model";

const procut_schema: JSONSchemaType<IProduct & {merchantId:string}> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "rate": {
            "type": "number",
            "minimum": 0,
            "maximum": 5
        },
        "price": {
            "type": "number",
            "exclusiveMinimum": 0
        },
        "shortDescription": {
            "type": "string",
            "minimum": 0
        },
        "availability": {
            "type": "boolean"
        },
        "weight": {
            "type": "number",
            "minimum": 0
        },
        "availableInventory": {
            "type": "number",
            "minimum": 0
        },
        "longDescription": {
            "type": "string"
        },
        "productInformation": {
            "type": "string"
        },
        "categoryName": {
            "type": "string"
        },
        "imagesURL": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "uri"
            }
        },
        "imgURL": {
            "type": "string",
            "format": "uri"
        },
        "merchantId": {
            "type": "string",
            "pattern": "^[0-9a-fA-F]{24}$"
        }
    },
    "required": [
        "name",
        "price",
        "shortDescription",
        "availability",
        "weight",
        "longDescription",
        "productInformation",
        "categoryName",
        "merchantId"
    ]
}


export default procut_schema;