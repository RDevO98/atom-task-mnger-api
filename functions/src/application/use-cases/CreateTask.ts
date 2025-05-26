import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { Task } from "../../domain/entities/Task";
import { v4 as uuidv4 } from "uuid";

interface CreateTaskDTO {
    title: string;
    description: string;
    completed?: boolean;
    userId: string,
    createdAt: string
}

export class CreateTask {
    constructor(private taskRepo: TaskRepository) { }

    async execute(input: CreateTaskDTO): Promise<Task> {
        const task = new Task({
            id: uuidv4(),
            title: input.title,
            description: input.description ?? "Sin descripción",
            completed: input.completed ?? false,
            userId: input.userId,
            createdAt: Date().toString()
        });

        await this.taskRepo.create(task);
        return task;
    }
}