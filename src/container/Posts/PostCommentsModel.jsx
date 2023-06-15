import React, { useState } from 'react';

import './PostCommentsModel.scss';
import Post from './Post';
import images from '../../constants/images';



const PostCommentsModel = ({ post }) => {
    const [comment, setComment] = useState('');

    return (
        <div className='post-comments-model'>
            <div className='post-comments-model__container'>
                <h2 className='post-owner'>{ `Publication de ${ post.name }` }</h2>
                <div className='post-comment-group'>
                    <Post 
                        post={ post } 
                        inTheComments={ true }
                    />
                    <div className='comments-group'>
                        <p>comment</p>
                        <p>comment</p>
                        <p>comment</p>
                        <p>comment</p>
                    </div>
                </div>
                <div className='add-new-comment'>
                    <div className='add-new-comment__user-profile'>
                        <img src={ images.user_1 } alt="user profile" />
                    </div>
                    <div className='add-new-comment__input'>
                        <input 
                            type="text"
                            name='comment'
                            value={ comment }
                            placeholder='Ecrivez un commentaire...'
                            onChange={ (e) =>  setComment(e.target.value) }
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PostCommentsModel;