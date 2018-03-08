/**
 * Created by bogdan on 07.03.18.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import store from './redux/configureStore';


const {Component} = React;


const Todo = ({onClick, completed, text}) => (
    <li onClick={onClick}
        style={{
            textDecoration:completed? 'line-through':'none'
        }}>
        {text}
    </li>
);

const TodoList = ({todos, onTodoClick}) => (
        <ul>
            {todos.map(item => <Todo key={item.id}
                                     {...item}
                                     onClick={()=>{onTodoClick(item.id)}}/>
            )}
        </ul>
    );

const FilterLink = ({filter,currentFilter, children})=>{
    if(filter === currentFilter)
        return <span>{children}</span>;
    return (<a href="#" onClick={e=>{
        e.preventDefault();
        store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
           filter
        });
    }}>{children}</a>)
};

const getVisibleTodos = (
    todos,
    filter
)=>{
    switch(filter){
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(item => !item.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(item => item.completed);
    }
};

let nextTodoId = 0;

class TodoApp extends Component {
    render() {
        const {todos, visibilityFilter} = this.props;
       const visibleTodos = getVisibleTodos(todos, visibilityFilter);
        return (
            <div>
                <input ref={node => {this.input = node;}}/>
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = '';
                }}>Add Todo
                </button>
                <TodoList todos={visibleTodos} onTodoClick={id => {
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id: id
                    });}}/>
                <p>Show:
                    {' '}
                    <FilterLink filter="SHOW_ALL" currentVisible={visibilityFilter}>ALL</FilterLink>
                    {' '}
                    <FilterLink filter="SHOW_ACTIVE" currentVisible={visibilityFilter}>ACTIVE</FilterLink>
                    {' '}
                    <FilterLink filter="SHOW_COMPLETED" currentVisible={visibilityFilter}>COMPLETED</FilterLink>
                </p>
            </div>)
    }
}

const render = () => {
    ReactDOM.render(<TodoApp {...store.getState()}/>,
        document.getElementById('root'));
};

store.subscribe(render);
render();