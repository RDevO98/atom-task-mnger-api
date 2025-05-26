import {Request, Response} from "express";
import {FirebaseUserRepository} from "../../infrastructure/repositories/FirebaseUserRepository";
import {GetUserByEmail} from "../../application/use-cases/GetUserByEmail";
import {CreateUser} from "../../application/use-cases/CreateUser";

const userRepo = new FirebaseUserRepository();

export const getUserByEmailHandler = async (_req: Request, res: Response) => {
  const {email} = _req.params;

  try {
    const useCase = new GetUserByEmail(userRepo);
    const user = await useCase.execute(email);
    if (!user) {
      res.status(404).json({message: "Usuario no encontrado"});
    } else {
      res.status(200).json(user.toJSON());
    }
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const createUserHandler = async (_req: Request, res: Response) => {
  const {email} = _req.body;

  try {
    const useCase = new CreateUser(userRepo);
    const user = await useCase.execute({email});
    res.status(201).json(user.toJSON());
  } catch (err) {
    res.status(400).json({error: (err as Error).message});
  }
};
