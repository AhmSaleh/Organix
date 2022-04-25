import { Request, Response, NextFunction } from 'express';
import  ajv from "../Utils/validate";

export interface RequestWithSchema<T> extends Request {
    data: T;
}

export default function checkSchema<T>(schema_name:string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validate = ajv.getSchema(schema_name);
        const valid = validate!(req.body);
        // check the validation
        if (!valid) return res.status(400).send(validate?.errors);
        (req as RequestWithSchema<T>).data = req.body;
        next();   
    }
}