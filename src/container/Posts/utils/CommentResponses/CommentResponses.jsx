import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment/moment';
import { IoSend } from 'react-icons/io5';
import { setDoc, doc, where, collection, getDocs, query } from 'firebase/firestore';

import { db } from '../../../../config/firebase';
import images from '../../../../constants/images';
import './CommentResponses.scss';
import { useAuth } from '../../../../context/AuthContext';
import { Response } from '../index';



const CommentResponses = ({ post, autoResize, fetchResponsesNumber, targetComment }) => {
    const { user } = useAuth();
    const responseInputRef = useRef(null);

    const [response, setResponse] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    const target = post.comments[
        post.comments?.findIndex(
            comment => comment.time === targetComment
        )
    ];

    useEffect(() => {
    }, [response]);

    useEffect(() => {
        fetchResponses();
        fetchResponsesNumber();
    }, []);    

    const handleResponseChange = (e) => {
        setResponse(e.target.value);
        autoResize(responseInputRef);
    };

    const handleAddResponse = () => {
        setDoc(doc(db, 'responses', (new Date().getTime()).toString()), {
            responderName: user?.displayName || 'User',
            responderProfile: user?.photoURL,
            response: response,
            commentId: target.time,
            commentOwner: target.userName,
            time: new Date().getTime(),
        })
            .then(() => {
                setResponse('');
                fetchResponses();
                fetchResponsesNumber();
            })
            .catch((err) => console.error(err));
    };

    const fetchResponses = () => {
        const q = query(collection(db, "responses"), where("commentId", "==", targetComment));
        let existingResponses = [];

        getDocs(q)
            .then((res) => {
                res.forEach((document) => {
                    existingResponses.push({ ...document.data() });
                })
                setResponses(existingResponses);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className='comment-responses__loading'>
                    <div className='profile-model' />
                    <div className='response-model'>
                        <div />
                        <div />
                    </div>
                </div>
            );
        }

        if (responses.length < 1) {
            return (
                <div>Be the first person to respond.</div>
            );
        }

        return (
            responses.map((res, i) => (
                <Response key={ `response-${ i+1 }` } res={ res } />
            ))
        );
    };

    return (
        <div className='comment-responses'>
            { renderContent() }

            <div className='add-response'>
                <div className='prof'>
                    <img 
                        src={ user?.photoURL ? user?.photoURL : images.user_1 } 
                        alt=''
                        loading='lazy'
                        referrerPolicy='no-referrer'
                        style={{ background: 'var(--gray_color)' }}
                        draggable='false'
                    />
                </div>

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