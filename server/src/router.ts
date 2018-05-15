import {Router} from 'express';
import {healthCheck} from 'health_check';
import {todosController} from 'todos/todos_controller';

export const router = Router()
	.get('/health', healthCheck)
	.use('/api', Router()
		.use('/todos', todosController)
	);
