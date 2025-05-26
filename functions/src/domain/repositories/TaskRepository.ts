import {Task} from "../entities/Task";

export interface TaskRepository {
    create(task: Task): Promise<void>;
    findAll(userId: string): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    update(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}
