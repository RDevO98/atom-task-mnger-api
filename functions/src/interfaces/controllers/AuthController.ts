import {Request, Response} from "express";
import {FirebaseUserRepository} from "../../infrastructure/repositories/FirebaseUserRepository";
import {CreateUser} from "../../application/use-cases/CreateUser";
import {GetUserByEmail} from "../../application/use-cases/GetUserByEmail";
import jwt from "jsonwebtoken";
import {FirebaseConfig} from "../../infrastructure/firebase/config";

const userRepo = new FirebaseUserRepository();

export const loginHandler = async (req: Request, res: Response) => {
  const {email} = req.body;

  try {
    const useCase = new GetUserByEmail(userRepo);
    const user = await useCase.execute(email);

    if (user) {
      const token = jwt.sign({userId: user.id, email: user.email}, FirebaseConfig.jwtSecret(), {expiresIn: "1h"});
      res.status(200).json({message: "Bienvenido de nuevo", token});
      return;
    }

    res.status(200).json({message: "Usuario no encontrado", askToCreate: true});
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const confirmCreateAndLoginHandler = async (req: Request, res: Response) => {
  const {email} = req.body;

  try {
    const useCase = new CreateUser(userRepo);
    const user = await useCase.execute({email});

    const token = jwt.sign({userId: user.id, email: user.email}, FirebaseConfig.jwtSecret(), {expiresIn: "1h"});

    res.status(201).json({message: "Usuario creado", token});
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};
