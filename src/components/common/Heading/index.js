import React from 'react';
import './Heading.scss'

export default function Heading(props) {
    const {title} = props;
    return (
        <div className='heading-wrapper'>
            <h2>{title}</h2>
        </div>
    );
};