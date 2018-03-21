/**
 * Created by bogdan on 07.03.18.
 */

import {createStore} from 'redux';
import todoApp from './reducers/todo.reducer'
import {loadState, saveState} from '../utils/localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(todoApp, persistedState);

    store.subscribe(throttle(() => {
        saveState({todos: store.getState().todos})
    }, 1000));

    return store;
};

export default configureStore;