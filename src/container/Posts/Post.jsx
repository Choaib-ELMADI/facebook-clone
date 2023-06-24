import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../../config/firebase';
import './Post.scss';
import { PostHeader, PostBody, PostFooter, PostCommentsModel } from './utils/index';



const Post = ({ post, inTheComments }) => {
    const [hidePost, setHidePost] = useState(false);
    const [viewPostCommentsModel, setViewPostCommentsModel] = useState(false);
    const [responsesNumber, setResponsesNumber] = useState(0);

    useEffect(() => {
        fetchResponsesNumber();
    }, [responsesNumber]);

    const fetchResponsesNumber = () => {
        let i=0;
        getDocs(collection(db, 'responses'))
            .then((res) => {
                if (res) {
                    res.forEach((doc) => {
                        i++;
                    })
                    setResponsesNumber(i);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div 
            className='posts-container__post'
            style={{
                boxShadow: inTheComments ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}
        >
            { !hidePost && (
                <>
                    <PostHeader 
                        post={ post } 
                        setHidePost={ setHidePost }
                        setViewPostCommentsModel={ setViewPostCommentsModel }
                        inTheComments={ inTheComments }
                    />
                    <PostBody post={ post } />
                    <PostFooter 
                        post={ post }
                        inTheComments={ inTheComments }
                        setViewPostCommentsModel={ setViewPostCommentsModel }
                        responsesNumber={ responsesNumber }
                    />
                </>
            )}

            { hidePost && (
                <div className='post-hided'>
                    <span>X</span>
                    <div>
                        <p>Publication masquée</p>
                        <p>Masquer des publications aide Facebook à personnaliser votre Fil.</p>
                    </div>
                    <button
                        onClick={ () => setHidePost(false) }
                    >Annuler</button>
                </div>
            )}

            { viewPostCommentsModel && (
                <PostCommentsModel 
                    post={ post }
                    setViewPostCommentsModel={ setViewPostCommentsModel }
                    fetchResponsesNumber={ fetchResponsesNumber }
                />
            )}
        </div>
    );
};

export default Post;