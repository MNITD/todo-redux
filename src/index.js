/**
 * Created by bogdan on 07.03.18.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import store from './redux/configureStore';


const {Component} = React;


const AddTodo = ({onAddClick}) => {
    let input;
    return (<div>
        <input ref={node => {
            input = node;
        }}/>
        <button onClick={() => {
            onAddClick(input.value);
            input.value = '';
        }}>
            Add Todo
        </button>
    </div>);
};


const Todo = ({onClick, completed, text}) => (
    <li onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}>
        {text}
    </li>
);

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(item => <Todo key={item.id}
                                 {...item}
                                 onClick={() => {
                                     onTodoClick(item.id)
                                 }}/>
        )}
    </ul>
);

const Footer = ({visibilityFilter, onFilterCLick}) => (
    <p>Show:
        {' '}
        <FilterLink filter="SHOW_ALL" currentVisible={visibilityFilter} onClick={onFilterCLick}>ALL</FilterLink>
        {' '}
        <FilterLink filter="SHOW_ACTIVE" currentVisible={visibilityFilter} onClick={onFilterCLick}>ACTIVE</FilterLink>
        {' '}
        <FilterLink filter="SHOW_COMPLETED" currentVisible={visibilityFilter}
                    onClick={onFilterCLick}>COMPLETED</FilterLink>
    </p>
);

const FilterLink = ({filter, currentFilter, onClick, children}) => {
    if (filter === currentFilter)
        return <span>{children}</span>;
    return (<a href="#" onClick={e => {
        e.preventDefault();
        onClick(filter);
    }}>{children}</a>)
};

const getVisibleTodos = (todos,
                         filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(item => !item.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(item => item.completed);
    }
};

let nextTodoId = 0;

const TodoApp = ({todos, visibilityFilter}) => (
    <div>
        <AddTodo onAddClick={(text) => store.dispatch({
            type: 'ADD_TODO',
            text,
            id: nextTodoId++
        })}/>
        <TodoList todos={getVisibleTodos(todos, visibilityFilter)}
                  onTodoClick={id => {
                      store.dispatch({
                          type: 'TOGGLE_TODO',
                          id: id
                      });
                  }}/>
        <Footer visibilityFilter={visibilityFilter}
                onFilterClick={(filter) => {
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter
                    });
                }}/>
    </div>);

const render = () => {
    ReactDOM.render(<TodoApp {...store.getState()}/>,
        document.getElementById('root'));
};

store.subscribe(render);
render();