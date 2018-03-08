/**
 * Created by bogdan on 07.03.18.
 */
const expect = require('expect');
const deepFreeze = require('deep-freeze');
import {combineReducers} from 'redux';

const todo = (state, action) =>{
    switch(action.type){
        case 'ADD_TODO':
         return {
            id: action.id,
                text: action.text,
            completed:false
        };
        case 'TOGGLE_TODO':
            if(state.id !== action.id)
                return state;
            return {
                ...state, completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(item=> todo(item, action));
        default:
            return state;
    }
};

const visibilityFilter = (
    state = 'SHOW_ALL',
    action) => {
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return  action.filter;
        default:
            return state;
    }
};

const conbineReducers = (reducers) =>{
    return (state = {}, action) =>{
      return Object.keys(reducers).reduce(
          (nextState, key) => {
              nextState[key] = reducers[key](state[key], action);
              return nextState;
          },
          {}
      );

    };
};

const todoApp = combineReducers({todos, visibilityFilter});
// const todoApp = (state ={}, action) => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//     }
// };

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'some text'
    };

    const stateAfter = [
        {
            id: 0,
            text: 'some text',
            completed: false
        }
    ];
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'some text',
            completed: false
        },
        {
            id: 1,
            text: 'some text',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1,
        text: 'some text'
    };

    const stateAfter = [
        {
            id: 0,
            text: 'some text',
            completed: false
        },
        {
            id: 1,
            text: 'some text',
            completed: true
        }
    ];
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.log('All test passed!');


export default todoApp;