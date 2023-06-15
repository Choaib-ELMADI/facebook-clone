import React from 'react';

import './Posts.scss';
import Post from './Post';
import PostModel from './utils/PostModel';
import NoPost from './utils/NoPost';



const Posts = ({ loading, posts }) => {
    return (
        <div className='posts-container'>
            {   loading ?
                <>
                    <PostModel />
                    <PostModel />
                </>
                :
                posts.length < 1 ?
                <NoPost />
                :
                posts.map(post => (
                    <Post key={ post.id } post={ post } />
                ))
            }
        </div>
    );
};

export default Posts;