import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

import './Love.scss';



const Love = ({ zIndex }) => {
    return (
        <div className='reaction love-reaction' style={{ zIndex }}>
            <AiFillHeart color='var(--white_color)' />
        </div>
    );
};

export default Love;