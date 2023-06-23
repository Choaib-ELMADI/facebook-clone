import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { setDoc, doc, arrayUnion, collection, updateDoc } from 'firebase/firestore';

import { db } from '../../../../config/firebase';
import images from '../../../../constants/images';
import './CommentResponses.scss';
import { useAuth } from '../../../../context/AuthContext';



const CommentResponses = ({ post, autoResize, showTextInput, setShowTextInput, targetComment }) => {
    const [response, setResponse] = useState('');

    const target = post.comments[
        post.comments?.findIndex(
            comment => comment.time === targetComment
        )
    ];

    const { user } = useAuth();
    const responseInputRef = useRef(null);

    useEffect(() => {
    }, [response]);

    const handleResponseChange = (e) => {
        setResponse(e.target.value);
        autoResize(responseInputRef);
    };

    const handleAddResponse = () => {
        setDoc(doc(db, 'responses', target.time), {
            responses: arrayUnion({
                responderName: user?.displayName || 'User',
                responderProfile: user?.photoURL,
                response: response,
                commentId: target.time,
                commentOwner: target.userName,
                time: new Date().getTime(),
            })
        })
            .then(() => setResponse(''))
            .catch((err) => console.error(err));
    }

    return (
        <div className='comment-responses'>
            CommentResponses

            <div className='add-response'>
                <img 
                    src={ user?.photoURL ? user?.photoURL : images.user_1 } 
                    alt=''
                    loading='lazy'
                    referrerPolicy='no-referrer'
                    style={{ background: 'var(--gray_color)' }}
                    draggable='false'
                />

                <div className='add-response__input'>
                    <textarea
                        ref={ responseInputRef }
                        type="text"
                        name='response'
                        value={ response }
                        placeholder={ `Répondre à ${ target.userName }...` }
                        onChange={ handleResponseChange }
                        required
                        autoFocus
                    >
                    </textarea>
                    <button
                        disabled={ response === '' }
                        onClick={ handleAddResponse }
                    >
                        <IoSend size={ 16 } color='var(--main_bleu_color)' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentResponses;