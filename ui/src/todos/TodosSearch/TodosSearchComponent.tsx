import * as React from 'react';
import { FormEventHandler } from 'react';

export interface TodosSearchComponentProps {
	searchText: string;
	setSearchText: (text: string) => void;
}

export class TodosListSearchComponent extends React.Component<TodosSearchComponentProps, {}> {

	render() {
		const { searchText } = this.props;

		return (
			<div>
				<label>Search <input type='text' value={searchText} onChange={this.updateSearchText} /></label>
			</div>
		);
	}

	updateSearchText: FormEventHandler<HTMLInputElement> = e => this.props.setSearchText(e.currentTarget.value);
}
