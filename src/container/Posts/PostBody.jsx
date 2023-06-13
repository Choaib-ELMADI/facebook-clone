import React from 'react';



const PostBody = ({ post }) => {
    const { postContent, hasImage, postImage } = post;

    return (
        <div className='post-body'>
            { postContent &&
                <p>{ postContent }</p>
            }
            <div className='post-body__image'>
                { hasImage &&
                    <img src={ postImage } alt="post image" draggable='false' />
                }
            </div>
        </div>
    );
};

export default PostBody;