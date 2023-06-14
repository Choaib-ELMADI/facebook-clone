import React, { useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { RiShareForwardLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

import { Care, Funny, Grrr, Like, Love, Sad, Wouah } from '../../components/index';
const containerVariants = {
    hidden: {
        opacity: 0,
        y: '1rem',
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .45,
            type: 'spring',
            delay: .2,
        }
    },
};



const GiveReaction = ({ setGiveReaction }) => {
    return (
        <motion.div 
            className='give-reaction-wrapper'
            onPointerLeave={ () => setGiveReaction(false) }
            variants={ containerVariants }
            initial='hidden'
            animate='visible'
        >
            <Like animate={ true } />
            <Love animate={ true } />
            <Care />
            <Grrr />
        </motion.div>
    )
};

const PostFooter = () => {
    const [giveReaction, setGiveReaction] = useState(false);

    return (
        <div 
            className='post-footer'
            onPointerLeave={ () => setGiveReaction(false) }
        >
            <div className='post-numbers'>
                <div className='reactions'>
                    <Like zIndex={ 3 } />
                    <Love zIndex={ 2 } />
                    <Care zIndex={ 1 } />
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
                <button
                    onPointerEnter={ () => setGiveReaction(true) }
                >
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

            { giveReaction &&
                <GiveReaction setGiveReaction={ setGiveReaction } />
            }
        </div>
    );
};

export default PostFooter;