import { JSONSchemaType } from "ajv"




export interface IRegesterData {
    email: string;
    password: string;
    name: {
        first: string;
        last: string;
    },

}
const regester_schema_user: JSONSchemaType<IRegesterData> = {
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
    },
    required: ["email", "password", "name"],
    additionalProperties: false
}


export default regester_schema_user;

