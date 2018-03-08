/**
 * Created by bogdan on 07.03.18.
 */
import ReactDOM from 'react-dom';
import React from 'react';



const {Component} = React;


const AddTodo = ({store}) => {
    let input;
    return (<div>
        <input ref={node => {
            input = node;
        }}/>
        <button onClick={() => {
            store.dispatch({
                type: 'ADD_TODO',
                text: input.value,
                id: nextTodoId++
            });
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
        <FilterLink filter="SHOW_ALL" store={store}>ALL</FilterLink>
        {' '}
        <FilterLink filter="SHOW_ACTIVE" store={store}>ACTIVE</FilterLink>
        {' '}
        <FilterLink filter="SHOW_COMPLETED" store={store}>COMPLETED</FilterLink>
    </p>
);

class FilterLink extends Component {
    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = props.store.getState();
        const onClick = () => {
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: props.filter
            })
        };
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

class VisibleTodoList extends Component {
    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.props;
        const state =  store.getState();

        const onClick = id => {
            store.dispatch({
                type: 'TOGGLE_TODO',
                id: id
            })
        };

        return <TodoList
            todos={getVisibleTodos(state.todo, state.visibilityFilter)}
            onTodoClick={onClick}/>
    }
}


let nextTodoId = 0;

const TodoApp = ({store}) => (
    <div>
        <AddTodo store={store}/>
        <VisibleTodoList store={store}/>
        <Footer store={store}/>
    </div>);

import store from './redux/configureStore';

ReactDOM.render(<TodoApp store={store.getState()}/>,
    document.getElementById('root'));
