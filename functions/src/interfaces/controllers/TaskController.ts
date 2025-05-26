import {Request, Response} from "express";
import {FirebaseTaskRepository} from "../../infrastructure/repositories/FirebaseTaskRepository";
import {GetAllTasks} from "../../application/use-cases/GetAllTasks";
import {CreateTask} from "../../application/use-cases/CreateTask";
import {UpdateTask} from "../../application/use-cases/UpdateTask";
import {DeleteTask} from "../../application/use-cases/DeleteTask";
import {GetTaskById} from "../../application/use-cases/GetTaskById";

const taskRepo = new FirebaseTaskRepository();

export const getAllTasksHandler = async (req: Request, res: Response) => {
  try {
    const {userId} = (req as any).user;
    const useCase = new GetAllTasks(taskRepo);
    const tasks = await useCase.execute(userId);
    res.status(200).json(tasks.map((t) => t.toJSON()));
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const getTaskByIdHandler = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const useCase = new GetTaskById(taskRepo);
    const tasks = await useCase.execute(id);
    res.status(200).json(tasks ? tasks.toJSON() : null);
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    const {userId} = (req as any).user;
    const useCase = new CreateTask(taskRepo);
    const task = await useCase.execute({...req.body, userId});
    res.status(201).json(task.toJSON());
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const useCase = new UpdateTask(taskRepo);
    const updated = await useCase.execute({id, ...req.body});
    res.json(updated.toJSON());
  } catch (err) {
    res.status(404).json({error: (err as Error).message});
  }
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const useCase = new DeleteTask(taskRepo);
    await useCase.execute(id);
    res.status(200).send();
  } catch (err) {
    res.status(404).json({error: (err as Error).message});
  }
};
