import {Request, Response} from 'express';
import {Router} from 'express';
import {todosService} from 'todos/todosService';

export const todosController =
	Router()
		.get('', (req: Request, res: Response) => res.sendPromise(todosService.find()))
		.post('', (req: Request, res: Response) => res.sendPromise(todosService.create(req.body)))
		.patch('', (req: Request, res: Response) => res.sendPromise(todosService.update(req.body)))
		.delete('/:id', (req: Request, res: Response) => res.sendPromise(todosService.deleteById(req.params.id)));
