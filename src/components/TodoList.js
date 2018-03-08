/**
 * Created by bogdan on 08.03.18.
 */
import React from 'react';

import Todo from '../components/Todo';

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

export default TodoList;