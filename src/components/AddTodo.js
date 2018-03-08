/**
 * Created by bogdan on 08.03.18.
 */
import React from 'react';
import {connect} from 'react-redux';

import addTodo from '../redux/actions/addTodo.action';


let AddTodo = ({dispatch}) => {
    let input;
    return (<div>
        <input ref={node => {
            input = node;
        }}/>
        <button onClick={() => {
            dispatch(addTodo(input.value));
            input.value = '';
        }}>
            Add Todo
        </button>
    </div>);
};

AddTodo = connect()(AddTodo);


export default AddTodo;