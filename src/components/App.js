/**
 * Created by bogdan on 08.03.18.
 */
import React from 'react';


import AddTodo from '../components/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from '../components/Footer';

const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>);

export default App