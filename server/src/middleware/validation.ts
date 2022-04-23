import { Request, Response, NextFunction } from 'express';
import  ajv from "../Utils/validate";



export default function checkSchema(schema_name:string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validate = ajv.getSchema(schema_name);
        const valid = validate(req.body);
        // check the validation
        if (!valid) return res.status(400).send(validate.errors);
        next();

        
    }
}