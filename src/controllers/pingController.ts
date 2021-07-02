import { Request, Response } from "express";
import { body } from "express-validator";

export const schema = [
    body('ping', "Must be NuMeric").isNumeric(),
];

export function pong(req: Request, res: Response) {
    res.json({message: 'pong'});
}
