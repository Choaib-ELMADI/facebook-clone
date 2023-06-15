import React, { useState } from 'react';

import './Post.scss';
import PostHeader from './utils/PostHeader';
import PostBody from './utils/PostBody';
import PostFooter from './utils/PostFooter';
import PostCommentsModel from './PostCommentsModel';



const Post = ({ post, inTheComments }) => {
    const [hidePost, setHidePost] = useState(false);
    const [viewPostCommentsModel, setViewPostCommentsModel] = useState(false);

    return (
        <div 
            className='posts-container__post'
            style={{
                boxShadow: inTheComments ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}
        >
            { !hidePost ?
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
                    />
                </>
                :
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
            }
            {
                viewPostCommentsModel &&
                <PostCommentsModel post={ post } />
            }
        </div>
    );
};

export default Post;