import * as styles from './TodosListComponent.scss';
import * as React from 'react';
import { FormEventHandler, KeyboardEventHandler } from 'react';
import { Key } from 'ts-keycode-enum';
import { TodoEntity, CreateTodoEntity } from 'shared-models/todos';

export interface TodosListComponentProps {
	todos: TodoEntity[];
	refresh: () => void;
	addTodo: (todo: CreateTodoEntity) => void;
}

export interface TodosListState {
	todoText: string;
}

export class TodosListComponent extends React.PureComponent<TodosListComponentProps, TodosListState> {
	state = {
		todoText: ''
	};

	render() {
		const { todos } = this.props;
		
		return (
			<div>
				<button onClick={this.addTodo}>add</button>
				<input type='text' value={this.state.todoText} onChange={this.updateTodoText} onKeyPress={this.handleEnter} />
				<ol className={styles.list}>
					{todos.map((todo: TodoEntity) => <li key={todo.id}>{todo.text}</li>)}
				</ol>
			</div>
		);
	}

	componentDidMount() {
		this.props.refresh();
	}

	updateTodoText: FormEventHandler<HTMLInputElement> = e => this.setState({ todoText: e.currentTarget.value });

	addTodo = () => {
		this.props.addTodo({ text: this.state.todoText });
		this.setState({ todoText: '' });
	};

	handleEnter: KeyboardEventHandler<HTMLInputElement> = e => {
		if (e.which === Key.Enter) {
			this.addTodo();
		}
	}
}
