import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {hocLogger} from './hocLogger';

interface WithObservableState<S> {
	wrappedComponentProps: S;
}

type WithObservableComponent<P> = new() => React.PureComponent<{}, WithObservableState<P>>;
type CreateWithObservableComponent<P> = (wc: React.ComponentClass<P>, displayName?: string) => WithObservableComponent<P>;

export function withObservable<P>(observable: Observable<P>): CreateWithObservableComponent<P> {

	return (WrappedComponent: React.ComponentClass<P>, displayName?: string) => {
		const wrappedComponentDisplayName = displayName || `WithObservable(${WrappedComponent.displayName || WrappedComponent.name}`;

		return class WithObservable extends React.PureComponent<{}, WithObservableState<P>> {
			static displayName = wrappedComponentDisplayName;

			subscription?: Subscription;

			componentDidMount() {
				this.subscription = observable.subscribe((wrappedComponentProps: P) => {
					this.setState({wrappedComponentProps});
				});
			}

			componentWillUnmount() {
				if (this.subscription) {
					this.subscription.unsubscribe();
				}
			}

			render() {
				if (this.state == null) {
					return null;
				}

				hocLogger(WithObservable.displayName, this.state.wrappedComponentProps);

				return React.createElement(WrappedComponent, Object.assign({}, this.props, this.state.wrappedComponentProps));
			}
		};
	};
}
