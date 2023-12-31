import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { CgClose } from 'react-icons/cg';
import { IoSend } from 'react-icons/io5';
import { GiMicrophone } from 'react-icons/gi';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { SpecificCommentResponses, CommentResponses} from '../index';
import { useAuth } from '../../../../context/AuthContext';
import images from '../../../../constants/images';
import { db } from '../../../../config/firebase';
import './PostCommentsModel.scss';
import Post from '../../Post';



const PostCommentsModel = ({ post, viewPostCommentsModel, setViewPostCommentsModel, fetchResponsesNumber }) => {
    const [comment, setComment] = useState('');
    const commentInputRef = useRef(null);
    const [showTextInput, setShowTextInput] = useState(false);
    const [targetComment, setTargetComment] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (viewPostCommentsModel) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [viewPostCommentsModel]);

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
                    userProfile: user.photoURL,
                    userId: user.uid,
                    postId: post.id,
                    comment: comment,
                    time: new Date().getTime(),
                }
            ),
        })
            .then(() => {
                setComment('');
            })
            .catch((err) => console.error(err));
    };

    const handleCommentResponse = (id) => {
        setShowTextInput(true);
        setTargetComment(id);
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
                        { !post.comments ?
                            <div className='comments-group__no-comment'>No comments yet</div>
                            :
                            post.comments.toReversed().map((comment, i) => (
                                <div className='comments-group__comment'
                                    key={ `comment-${ i }` } 
                                >
                                    <div className='comment-owner-profile'>
                                        <img 
                                            src={ comment.userProfile ? comment.userProfile : images.user_1 } 
                                            alt=''
                                            loading='lazy'
                                            referrerPolicy='no-referrer'
                                            style={{ background: 'var(--gray_color)' }}
                                            draggable='false'
                                        />
                                    </div>
                                    <div className='comment-details'>
                                        <div className={
                                                `${ 
                                                    comment.time === targetComment ? 
                                                    'comment-details__user-name-comment active' : 
                                                    'comment-details__user-name-comment' 
                                                }`
                                            }>
                                            <div className='is-owner'>
                                                { post.userId === comment.userId && (
                                                    <p className='for-owner'>
                                                        <GiMicrophone />
                                                        Author
                                                    </p>
                                                )}
                                                <p>{ comment.userName }</p>
                                            </div>
                                            <p className='actuel-comment'>{ comment.comment }</p>
                                        </div>
                                        <div className='response'>
                                            <p className='time'>{ moment(comment.time).fromNow() }</p>
                                            <button
                                                onClick={ () => handleCommentResponse(comment.time) }
                                            >Répondre</button>
                                        </div>

                                        { (comment.time === targetComment) && (
                                            <CommentResponses
                                                post={ post }
                                                autoResize={ autoResize }
                                                showTextInput={ showTextInput }
                                                setShowTextInput={ setShowTextInput }
                                                targetComment={ targetComment }
                                                fetchResponsesNumber={ fetchResponsesNumber }
                                            />
                                        )}

                                        <SpecificCommentResponses
                                            comment={ comment }
                                            targetComment={ targetComment }
                                            setTargetComment={ setTargetComment }
                                        />
                                    </div>                                    
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='add-new-comment'>
                    <div className='add-new-comment__wrapper'>
                        <div className='add-new-comment__wrapper__user-profile'>
                            <img 
                                src={ user?.photoURL ? user?.photoURL : images.user_1 } 
                                alt=''
                                loading='lazy'
                                referrerPolicy='no-referrer'
                                style={{ background: 'var(--gray_color)' }}
                                draggable='false'
                            />
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