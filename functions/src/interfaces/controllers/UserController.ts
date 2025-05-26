import { Request, Response } from "express";


import { FirebaseUserRepository } from "../../infrastructure/repositories/FirebaseUserRepository";
import { GetUserByEmail } from "../../application/use-cases/GetUserByEmail";
import { CreateUser } from "../../application/use-cases/CreateUser";

const userRepo = new FirebaseUserRepository();

export const getUserByEmailHandler = async (_req: Request, res: Response) => {
    const { email } = _req.params;

    try {
        const useCase = new GetUserByEmail(userRepo);
        const user = await useCase.execute(email);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {
            res.json(user.toJSON());
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const createUserHandler = async (_req: Request, res: Response) => {
    const { email } = _req.body;

    try {
        const useCase = new CreateUser(userRepo);
        const user = await useCase.execute({ email });
        res.status(201).json(user.toJSON());
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
