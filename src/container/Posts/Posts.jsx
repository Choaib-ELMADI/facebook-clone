import React from 'react';

import './Post.scss';
import Post from './Post';



const PostModel = () => {
    return (
        <h1>loading...</h1>
    );
};

const NoPost = () => {
    return (
        <h1>No Posts Yet</h1>
    );
};

const Posts = ({ loading, posts }) => {
    return (
        <div className='posts-container'>
            {   loading ?
                <PostModel />
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