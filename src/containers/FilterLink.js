/**
 * Created by bogdan on 08.03.18.
 */
import React from 'react';
import {Component} from 'react';
import {PropTypes} from 'prop-types';

import Link from '../components/Link';

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

export default FilterLink;