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

const Footer = () => (
    <p>Show:
        {' '}
        <FilterLink filter="SHOW_ALL">ALL</FilterLink>
        {' '}
        <FilterLink filter="SHOW_ACTIVE">ACTIVE</FilterLink>
        {' '}
        <FilterLink filter="SHOW_COMPLETED">COMPLETED</FilterLink>
    </p>
);

class FilterLink extends Component{
    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.forceUpdate();
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const props  = this.props;
        const state = store.getState();
        const onClick = ()=>{
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: props.filter
            })};
        return <Link active={props.filter === state.visibilityFilter} onClick={onClick}>{props.children}</Link>;
    }
}

const Link = ({active, onClick, children}) => {
    if (active)
        return <span>{children}</span>;
    return (<a href="#" onClick={e => {
        e.preventDefault();
        onClick();
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