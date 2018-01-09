interface CreateTodoEntity {
	text: string;
}

interface TodoEntity extends CreateTodoEntity, TimestampedEntity {
	id: number;
}
