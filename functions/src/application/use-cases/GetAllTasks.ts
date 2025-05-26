import {TaskRepository} from "../../domain/repositories/TaskRepository";
import {Task} from "../../domain/entities/Task";

export class GetAllTasks {
  constructor(private taskRepo: TaskRepository) { }

  async execute(userId: string): Promise<Task[]> {
    return this.taskRepo.findAll(userId);
  }
}
