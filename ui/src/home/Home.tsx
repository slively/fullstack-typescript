import * as React from 'react';
import { Link } from 'routing/Link';
import * as styles from './Home.scss';

export class HomePage extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				<h1 id='todos-link'><Link className={styles.link} routeName='todos'>todos</Link></h1>
			</div>
		);
	}
}