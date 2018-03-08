/**
 * Created by bogdan on 08.03.18.
 */

import {connect}  from 'react-redux';
import TodoList from '../components/TodoList';

import toggleTodo from '../redux/actions/toggleTodo.action';

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

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id));
        }
    };
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export  default  VisibleTodoList;