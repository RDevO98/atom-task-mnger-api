import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { Task } from "../../domain/entities/Task";
import { db } from "../firebase/db";

export class FirebaseTaskRepository implements TaskRepository {
    private collection = db.collection("tasks");

    async findAll(userId: string): Promise<Task[]> {
        const snapshot = await this.collection.where("userId", "==", userId).orderBy("createdAt", "desc").get();
        return snapshot.docs.map(doc =>
            new Task({ id: doc.id, ...(doc.data() as Omit<Task, "id">) })
        );
    }

    async findById(id: string): Promise<Task | null> {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return null;
        return new Task({ id: doc.id, ...(doc.data() as Omit<Task, "id">) });
    }

    async create(task: Task): Promise<void> {
        await this.collection.doc(task.id).set(task.toJSON());
    }

    async update(task: Task): Promise<void> {
        await this.collection.doc(task.id).update(task.toJSON());
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}