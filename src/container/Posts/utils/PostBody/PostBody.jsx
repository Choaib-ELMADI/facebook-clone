import React from 'react';

import './PostBody.scss';



const PostBody = ({ post }) => {
    const { postContent, hasImage } = post;

    return (
        <div className='post-body'>
            { postContent !== '' && (
                <>
                    <p>{ postContent }</p>
                    <input 
                        type="checkbox"
                        style={{ display: postContent.length > 130 ? '' : 'none' }}
                    />
                </>
            )}
            
            { hasImage && (
                <div className='post-body__image'>
                    <img 
                        src={ post.image } 
                        loading='lazy'
                        alt="post image" 
                        draggable='false' 
                    />
                </div>
            )}
        </div>
    );
};

export default PostBody;