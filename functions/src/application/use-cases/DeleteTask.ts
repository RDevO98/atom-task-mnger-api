import {TaskRepository} from "../../domain/repositories/TaskRepository";

export class DeleteTask {
  constructor(private taskRepo: TaskRepository) { }

  async execute(id: string): Promise<void> {
    const task = await this.taskRepo.findById(id);
    if (!task) {
      throw new Error("Tarea no encontrada");
    }

    await this.taskRepo.delete(id);
  }
}
