import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { db } from "../firebase/db";

export class FirebaseUserRepository implements UserRepository {
    private collection = db.collection("users");

    async findByEmail(email: string): Promise<User | null> {
        const snapshot = await this.collection.where("email", "==", email).limit(1).get();
        if (snapshot.empty) return null;

        const doc = snapshot.docs[0];
        return new User({ id: doc.id, ...(doc.data() as Omit<User, "id">) });
    }

    async create(user: User): Promise<void> {
        await this.collection.doc(user.id).set(user.toJSON());
    }
}