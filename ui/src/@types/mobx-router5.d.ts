declare module 'mobx-router5' {
    import {IObservableValue} from 'mobx';
    import {State, Router, PluginFactory} from 'router5';

    export class RouterStore {
        route: IObservableValue<State>;
        previousRoute: IObservableValue<State>;
        transitionRoute: IObservableValue<State>;
        transitionError: IObservableValue<any>;
        intersectionNode: IObservableValue<string>;
        router: Router;
    }

    export const mobxPlugin: (r: RouterStore) => PluginFactory;
}