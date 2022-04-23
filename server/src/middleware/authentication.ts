import { Request, Response, NextFunction } from 'express';
import conf from '../conf';
import { RoleEnum } from '../model/UserModel';
var jwt = require("jsonwebtoken");


export default function checkRole(...allawedRoles: RoleEnum[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        var Token = req.header("x-auth-token");
        if (!Token) return res.status(400).send("Access Denied...");
        try {
            var decodePayload = jwt.verify(Token, conf.JWT_SECRET);

            if (allawedRoles.includes(decodePayload.role)) {
                next();
            } else {
                return res.status(400).send("Access Denied...")
            }
        } catch (err) {
            res.status(400).send("Invalid Token")
        }
    }
}