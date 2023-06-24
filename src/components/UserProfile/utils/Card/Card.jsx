import React from 'react';

import './Card.scss';



const Card = ({ height, title }) => {
    return (
        <div 
            className='card'
            style={{ height }}
        >
            <h3>{ title }</h3>
        </div>
    );
};

export default Card;