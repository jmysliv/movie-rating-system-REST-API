import { jwtConfig } from './../jwt.config';
import crypto from "crypto";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";


export const register = (req: Request, res: Response) => {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto.createHmac("sha512", salt)
                                     .update(req.body.password)
                                     .digest("base64");
    req.body.password = salt + "$" + hash;
    const newUser = new UserModel(req.body);
    UserModel.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            res.status(409).send({error: "Given email already exists"});
        } else {
            newUser.save( (error, result) => {
                if (error) {
                    res.status(400).send(error);
                } else {
                    res.status(201).send({message: "Registered successfully"});
                }
            });
        }
    });
 };

export const login = (req: Request, res: Response) => {
    try {
        const token = jwt.sign(JSON.parse(JSON.stringify(req.user)), jwtConfig.jwt_secret);
        res.status(201).send({bearerToken: token});
    } catch (err) {
        res.status(500).send({error: err});
    }
};