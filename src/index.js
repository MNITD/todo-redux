/**
 * Created by bogdan on 07.03.18.
 */
import ReactDOM from 'react-dom';
import React from 'react';

import AddTodo from './components/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';
import Footer from './components/Footer';

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>);


import {Provider} from 'react-redux';
import store from './redux/configureStore';

ReactDOM.render(<Provider store={store}><TodoApp /></Provider>,
    document.getElementById('root'));
