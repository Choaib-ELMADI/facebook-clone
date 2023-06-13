import React from 'react';

import './Post.scss';
import PostHeader from './PostHeader';



const Post = ({ post }) => {
    return (
        <div className='posts-container__post'>
            <PostHeader post={ post } />
        </div>
    );
};

export default Post;