import React from 'react';
import { FaSitemap } from 'react-icons/fa';

import './NoPost.scss';



const NoPost = () => {
    return (
        <div className='no-post'>
            <h1>No posts yet</h1>

            <FaSitemap 
                color='var(--gray_color)'
                size={ 70 } 
                style={{ 
                    margin: '0 auto',
                    width: '100%',
                }}
            />
        </div>
    );
};

export default NoPost;