import {TaskRepository} from "../../domain/repositories/TaskRepository";
import {Task} from "../../domain/entities/Task";

export class GetTaskById {
  constructor(private taskRepo: TaskRepository) { }

  async execute(id: string): Promise<Task | null> {
    return this.taskRepo.findById(id);
  }
}
