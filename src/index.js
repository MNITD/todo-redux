/**
 * Created by bogdan on 07.03.18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

import configureStore from './redux/configureStore';


const store = configureStore();

ReactDOM.render(<Root store={store}/>,
    document.getElementById('root'));
