import {Router} from 'express';
import {healthCheck} from 'healthCheck';
import {todosController} from 'todos/todosController';

export const router = Router()
	.get('/health', healthCheck)
	.use('/api', Router()
		.use('/todos', todosController)
	);
