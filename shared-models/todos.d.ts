declare module 'shared-models/todos' {
	import {TimestampedEntity} from 'shared-models/timestamped-entity';

	export interface CreateTodoEntity {
		text: string;
	}

	export interface TodoEntity extends CreateTodoEntity, TimestampedEntity {
		id: number;
	}
}
