import React from 'react';
import { TbDots } from 'react-icons/tb';
import { CgClose } from 'react-icons/cg';
import { IoEarth } from 'react-icons/io5';

import './PostHeader';



const PostHeader = ({ post }) => {
    return (
        <div className='post-header'>
            <div className='post-header__profile'>
                <img src={ post.userProfile } alt={ post.userName } />
            </div>
            <div className='post-header__user-date'>
                <p>{ post.userName }</p>
                <p>
                    { post.date }{ '.' }
                    <IoEarth />
                </p>
            </div>
            <div className='post-header__options'><TbDots size={ 26 } /></div>
            <div className='post-header__remove'><CgClose size={ 26 } /></div>
        </div>
    );
};

export default PostHeader;