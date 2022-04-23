import { JSONSchemaType } from "ajv"
import Ajv, { JTDDataType } from "ajv/dist/jtd"
import { RoleEnum } from "../model/UserModel";




export interface IRegesterData {
    email: string;
    password: string;
    name: {
        first: string;
        last: string;
    },
    role: RoleEnum
}
const regester_schema: JSONSchemaType<IRegesterData> = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "maxLength": 20,
            "format": "password"
        },
        "name": {
            "type": "object",
            "properties": {
                "first": {
                    "type": "string",
                    "minLength": 2,
                    "maxLength": 20

                },
                "last": {
                    "type": "string",
                    "minLength": 2,
                    "maxLength": 20

                }
            },
            "required": ["first", "last"],
            "additionalProperties": false

        },
        "role": {
            type: "string",
            enum: Object.values(RoleEnum),
            default: RoleEnum.user
        },
    },
    required: ["email", "password", "name"],
    additionalProperties: false
}


export default regester_schema;

