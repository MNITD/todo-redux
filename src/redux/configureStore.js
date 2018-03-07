/**
 * Created by bogdan on 07.03.18.
 */

import ReactDOM from 'react-dom';

const counter = (state = 0, action)=>{
  switch (action.type){
      case 'INCREMENT':
          return state + 1;
      case 'DECREMENT':
          return state - 1;
      default:
          return state;
  }
};

const createStore = (reducer) =>{
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () =>{
            listeners = listeners.filter(l => l !== listener)
        }
    };

    dispatch({});

    return {getState, dispatch, subscribe};

};

// import {createStore} from 'redux';
const store = createStore(counter);

const render = () =>{
    document.body.innerHTML = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', ()=>{
    console.log('click');
    store.dispatch({type: 'INCREMENT'});
});

export default store;