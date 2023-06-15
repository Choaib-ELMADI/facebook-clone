import React from 'react';

import './PostCommentsModel.scss';
import Post from './Post';



const PostCommentsModel = ({ post }) => {
    return (
        <div className='post-comments-model'>
            <div className='post-comments-model__container'>
                <h1>{ `Publication de ${ post.name }` }</h1>
                <Post 
                    post={ post } 
                    inTheComments={ true }
                />
                <div>
                    comments container
                </div>
            </div>
        </div>
    )
};

export default PostCommentsModel;