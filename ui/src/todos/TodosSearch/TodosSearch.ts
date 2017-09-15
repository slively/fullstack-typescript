import {TodosListSearchComponent} from './TodosSearchComponent';
import {TodosSearchComponentProps} from './TodosSearchComponentProps';
import {todosSearchStore} from './TodosSearchStore';
import {withObservable} from 'lib/withObservable';
import combineLatestObj from 'lib/combineLatestObj';

export const todosSearchObservable = combineLatestObj<TodosSearchComponentProps>(todosSearchStore);

export const TodosSearch = withObservable<TodosSearchComponentProps>(todosSearchObservable)(TodosListSearchComponent, 'TodosSearch');
