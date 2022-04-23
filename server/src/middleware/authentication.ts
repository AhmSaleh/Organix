import { Request, Response, NextFunction } from 'express';
import conf from '../conf';
import { ITockeBayload } from '../controllers/UserController';
import { RoleEnum } from '../model/UserModel';
var jwt = require("jsonwebtoken");


export interface RequestWithAuth extends Request {
    tockenInfo: ITockeBayload;
}


export default function checkRole(...allawedRoles: RoleEnum[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        var Token = req.header("x-auth-token");
        if (!Token) return res.status(400).send("Access Denied no token provided");
        try {
            var decodePayload = jwt.verify(Token, conf.JWT_SECRET);
            if (allawedRoles.includes(decodePayload.role)) {
                (req as RequestWithAuth).tockenInfo = decodePayload;   // add the user to the request
                next();

            } else {
                return res.status(400).send("Access Denied invalid role");
            }
        } catch (err) {
            res.status(400).send("Invalid Token")
        }
    }
}