/**
 * Created by bogdan on 08.03.18.
 */
import React from 'react';

const Link = ({active, onClick, children}) => {
    if (active)
        return <span>{children}</span>;
    return (<a href="#" onClick={e => {
        e.preventDefault();
        onClick();
    }}>{children}</a>)
};

export default Link;