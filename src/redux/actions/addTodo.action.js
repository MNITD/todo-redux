/**
 * Created by bogdan on 08.03.18.
 */

import {v4} from 'node-uuid';

const addTodo = (text) =>({
        type: 'ADD_TODO',
        text,
        id: v4()
});

export default  addTodo;