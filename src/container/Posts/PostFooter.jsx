import React from 'react';
import { BiLike } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { RiShareForwardLine } from 'react-icons/ri';

import { Like, Love } from '../../components/index';



const PostFooter = () => {
    return (
        <div className='post-footer'>
            <div className='post-numbers'>
                <div className='reactions'>
                    <Like />
                    <Love />
                </div>
                <div className='comments-share'>
                    <p className='comments'>
                        10
                        <FaRegCommentAlt size={ 17 } />
                    </p>
                    <p className='share'>
                        10
                        <RiShareForwardLine size={ 24 } />
                    </p>
                </div>
            </div>
            <div className='line' />
            <div className='action-buttons'>
                <button>
                    <BiLike size={ 24 } />
                    J'aime
                </button>
                <button>
                    <FaRegCommentAlt size={ 20 } />
                    Commmenter
                </button>
                <button>
                    <RiShareForwardLine size={ 24 } />
                    Partager
                </button>
            </div>
        </div>
    );
};

export default PostFooter;