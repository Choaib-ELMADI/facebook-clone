import React from 'react';
import { AiFillLike } from 'react-icons/ai';

import './Like.scss';



const Like = ({ zIndex }) => {
    return (
        <div className='reaction like-reaction' style={{ zIndex }}>
            <AiFillLike color='var(--white_color)' />
        </div>
    );
};

export default Like;