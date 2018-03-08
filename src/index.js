/**
 * Created by bogdan on 07.03.18.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';


const {Component} = React;


const AddTodo = (props, {store}) => {
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
AddTodo.contextTypes = {
    store: PropTypes.object
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

class FilterLink extends Component {
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    static contextTypes = {
        store: PropTypes.object
    };

    render() {
        const props = this.props;
        const {store} = this.context;
        const state = store.getState();
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
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    static contextTypes = {
        store: PropTypes.object
    };

    render() {
        const {store} = this.context;
        const state =  store.getState();

        const onClick = id => {
            store.dispatch({
                type: 'TOGGLE_TODO',
                id: id
            })
        };

        return <TodoList
            todos={getVisibleTodos(state.todos, state.visibilityFilter)}
            onTodoClick={onClick}/>
    }
}


let nextTodoId = 0;

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>);

class Provider extends Component{
    getChildContext(){
        return {
            store: this.props.store
        }
    }

    static childContextTypes = {
        store: PropTypes.object
    };
    render(){
        return this.props.children;
    }
}

import store from './redux/configureStore';

ReactDOM.render(<Provider store={store}><TodoApp /></Provider>,
    document.getElementById('root'));
