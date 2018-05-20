import * as React from 'react';
import * as styles from './MainLayout.scss';

const logo = require('../img/logo.svg');

export class MainLayout extends React.Component<{}, {}> {
	render() {
		return (
			<div className={styles.mainLayout}>
				<div className={styles.header}>
					<img src={logo} className={styles.logo} alt='logo' />
				</div>
				{this.props.children}
			</div>
		);
	}
}
