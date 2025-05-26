import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";

interface CreateUserDTO {
    email: string;
}

export class CreateUser {
    constructor(private userRepo: UserRepository) { }

    async execute({ email }: CreateUserDTO): Promise<User> {
        if (!email) throw new Error("Email is required");

        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) throw new Error("El usuario ya existe");

        const user = new User({ id: uuidv4(), email });

        await this.userRepo.create(user);
        return user;
    }
}