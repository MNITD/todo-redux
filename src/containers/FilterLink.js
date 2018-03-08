/**
 * Created by bogdan on 08.03.18.
 */
import React from 'react';
import {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import Link from '../components/Link';

import setVisibility from '../redux/actions/setVisibility.action';

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibility(ownProps.filter))
        }
    };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;