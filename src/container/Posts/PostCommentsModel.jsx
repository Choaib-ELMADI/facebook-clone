import React, { useState, useRef } from 'react';
import moment from 'moment';
import { CgClose } from 'react-icons/cg';
import { IoSend } from 'react-icons/io5';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import './PostCommentsModel.scss';
import Post from './Post';
import images from '../../constants/images';



const PostCommentsModel = ({ post, setViewPostCommentsModel, fetchPosts }) => {
    const [comment, setComment] = useState('');
    const commentInputRef = useRef(null);
    const { user } = useAuth();

    const handleCommentChange = (e) => {
        setComment(e.target.value);

        autoResize(commentInputRef);
    };

    const autoResize = (item) => {
        const current = item.current;
        current.style.height = 'auto';
        current.style.height = `${ current.scrollHeight }px`;
    };

    const handleAddComment = () => {
        updateDoc(doc(db, 'posts', post.id), {
            comments: arrayUnion(
                {
                    userName: user.displayName || 'User',
                    time: new Date().getTime(),
                    comment: comment,
                }
            ),
        })
            .then(() => {
                setComment('');
                fetchPosts();
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className='post-comments-model'>
            <div className='post-comments-model__container'>
                <div 
                    className='post-comments-model__container__close'
                    onClick={ () => setViewPostCommentsModel(false) }
                >
                    <CgClose size={ 26 } />
                </div>
                <h2 className='post-owner'>{ `Publication de ${ post.name }` }</h2>
                <div className='post-comment-group'>
                    <Post 
                        post={ post } 
                        inTheComments={ true }
                    />
                    <div className='comments-group'>
                        {
                            !post.comments ?
                            <div className='comments-group__no-comment'>No comments yet</div>
                            :
                            post.comments.map((comment, i) => (
                                <div key={ `comment-${ i }` } className='comments-group__comment'>
                                    <div className='comment-owner-profile'>
                                        <img src={ images.user_1 } alt="user profile" />
                                    </div>
                                    <div className='comment-details'>
                                        <div>
                                            <p>{ comment.userName }</p>
                                            <p>{ comment.comment }</p>
                                        </div>
                                        <p className='time'>{ moment(comment.time).fromNow() }</p>
                                    </div>                                    
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='add-new-comment'>
                    <div className='add-new-comment__wrapper'>
                        <div className='add-new-comment__wrapper__user-profile'>
                            <img src={ images.user_1 } alt="user profile" />
                        </div>
                        <div className='add-new-comment__wrapper__input'>
                            <textarea
                                ref={ commentInputRef }
                                type="text"
                                name='comment'
                                value={ comment }
                                placeholder='Ecrivez un commentaire...'
                                onChange={ handleCommentChange }
                                required
                            >
                            </textarea>
                            <button
                                disabled={ comment === '' }
                                onClick={ handleAddComment }
                            >
                                <IoSend size={ 20 } color='var(--main_bleu_color)' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PostCommentsModel;