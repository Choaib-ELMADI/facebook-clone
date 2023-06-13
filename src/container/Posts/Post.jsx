import React from 'react';

import './Post.scss';
import PostHeader from './PostHeader';
import PostBody from './PostBody';



const Post = ({ post }) => {
    return (
        <div className='posts-container__post'>
            <PostHeader post={ post } />
            <PostBody post={ post } />
        </div>
    );
};

export default Post;