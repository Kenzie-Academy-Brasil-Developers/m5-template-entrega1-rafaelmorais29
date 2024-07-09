import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/appError';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        throw new AppError("Token is required", 401); 
    }

    const secret = process.env.JWT_SECRET as string;

    try {
        const decodedToken = jwt.verify(token, secret) as { userId: string }; 
        res.locals.decode = decodedToken;
        next();
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
}