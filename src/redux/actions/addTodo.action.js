/**
 * Created by bogdan on 08.03.18.
 */

let nextTodoId = 0;

const addTodo = (text) =>{
    return {
        type: 'ADD_TODO',
        text,
        id: nextTodoId++
    }
};

export default  addTodo;