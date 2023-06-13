import React from 'react';

import './Post.scss';
import Post from './Post';
import images from '../../constants/images';

const post = {
    userName: 'user name',
    userProfile: images.user_2,
    postContent: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, possimus?',
    hasImage: true,
    postImage: images.user_2,
    date: '1h 20min'
}



const Posts = () => {
    return (
        <div className='posts-container'>
            <Post post={ post } />
            <Post post={ post } />
            <Post post={ post } />
            <Post post={ post } />
        </div>
    );
};

export default Posts;