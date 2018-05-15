import { Request, Response } from 'express';
import { Router } from 'express';
import { TodosService } from 'todos/todos_service';

const todosService = TodosService.getInstance();

export const todosController =
	Router()
		.get('', (req: Request, res: Response) => res.sendPromise(todosService.find()))
		.post('', (req: Request, res: Response) => res.sendPromise(todosService.create(req.body)))
		.patch('', (req: Request, res: Response) => res.sendPromise(todosService.update(req.body)))
		.delete('/:id', (req: Request, res: Response) => res.sendPromise(todosService.deleteById(req.params.id)));
