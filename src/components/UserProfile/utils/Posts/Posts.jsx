import React from 'react';

import Post from '../../../../container/Posts/Post';
import { NoPost, PostModel } from '../../../../container/Posts/utils/index';
import './Posts.scss';



const Posts = ({ userPosts, loading }) => {
    const renderContent = () => {
        if (loading) {
            return (
                <PostModel />
            );
        }

        if (userPosts.length === 0) {
            return (
                <NoPost />
            );
        }

        return (
            userPosts.toReversed().map(userPost => (
                <Post 
                    key={ userPost.id } 
                    post={ userPost }
                    inTheComments={ true }
                />
            ))
        );
    };

    return (
        <div className='user-posts-container'>
            { renderContent() }
        </div>
    );
};

export default Posts;
