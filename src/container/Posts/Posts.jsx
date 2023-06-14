import React from 'react';

import './Post.scss';
import Post from './Post';
import PostModel from './PostModel';
import NoPost from './NoPost';



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