import React, { useState } from 'react';

import './Post.scss';
import PostHeader from './PostHeader';
import PostBody from './PostBody';



const Post = ({ post }) => {
    const [hidePost, setHidePost] = useState(false);

    return (
        <div className='posts-container__post'>
            { !hidePost ?
                <>
                    <PostHeader post={ post } setHidePost={ setHidePost } />
                    <PostBody post={ post } />
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
        </div>
    );
};

export default Post;