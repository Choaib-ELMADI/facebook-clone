import React from 'react';

import './Posts.scss';
import Post from './Post';
import { NoPost, PostModel } from './utils/index';



const Posts = ({ loading, posts, fetchPosts }) => {
    const renderContent = () => {
        if (loading) {
            return (
                <>
                    <PostModel />
                    <PostModel />
                </>
            );
        }

        if (posts.length < 1) {
            return (
                <NoPost />
            );
        }

        return (
            posts.toReversed().map(post => (
                <Post 
                    key={ post.id } 
                    post={ post } 
                    fetchPosts={ fetchPosts }
                />
            ))
        );
    };

    return (
        <div className='posts-container'>
            { renderContent() }
        </div>
    );
};

export default Posts;