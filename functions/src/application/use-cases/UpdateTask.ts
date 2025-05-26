import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { Task } from "../../domain/entities/Task";

interface UpdateTaskDTO {
    id: string;
    title?: string;
    description?: string;
    completed?: boolean;
}

export class UpdateTask {
    constructor(private taskRepo: TaskRepository) { }

    async execute(input: UpdateTaskDTO): Promise<Task> {
        const task = await this.taskRepo.findById(input.id);
        if (!task) {
            throw new Error("Tarea no encontrada");
        }

        const updatedTask = new Task({
            ...task.toJSON(),
            ...input,
        });

        await this.taskRepo.update(updatedTask);
        return updatedTask;
    }
}