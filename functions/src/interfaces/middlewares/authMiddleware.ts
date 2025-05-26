import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {FirebaseConfig} from "../../infrastructure/firebase/config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({message: "Token requerido"});
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, FirebaseConfig.jwtSecret());
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({message: "Token inválido"});
  }
};
