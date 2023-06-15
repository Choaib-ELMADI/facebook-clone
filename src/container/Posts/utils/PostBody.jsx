import React from 'react';



const PostBody = ({ post }) => {
    const { postContent, email, name, time, hasImage } = post;

    return (
        <div className='post-body'>
            { postContent !== '' &&
                <p>{ postContent }</p>
            }
            <div className='post-body__image'>
                { hasImage &&
                    <img 
                        src={ post.image } 
                        loading='lazy'
                        alt="post image" 
                        draggable='false' 
                    />
                }
            </div>
        </div>
    );
};

export default PostBody;