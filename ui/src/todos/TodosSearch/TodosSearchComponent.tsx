import * as React from 'react';
import {TodosSearchComponentProps} from './TodosSearchComponentProps';
import {FormEventHandler} from 'react';
import {SPC} from 'lib/SPC';

export class TodosListSearchComponent extends SPC<TodosSearchComponentProps> {

	render() {
		const {searchText} = this.props;

		return (
			<div>
				<label>Search <input type='text' value={searchText} onChange={this.updateSearchText}/></label>
			</div>
		);
	}

	updateSearchText: FormEventHandler<HTMLInputElement> = e => this.props.setSearchText(e.currentTarget.value);
}
