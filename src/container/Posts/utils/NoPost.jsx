import React from 'react';
import { FaSitemap } from 'react-icons/fa';

import './NoPost.scss';



const NoPost = () => {
    return (
        <div className='no-post'>
            <h1>No Posts Yet</h1>

            <FaSitemap 
                color='var(--gray_color)'
                size={ 80 } 
                style={{ 
                    margin: '0 auto',
                    width: '100%',
                }}
            />
        </div>
    );
};

export default NoPost;