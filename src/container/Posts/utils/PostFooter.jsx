import React, { useState, useEffect } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { RiShareForwardLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { AiOutlineLike } from 'react-icons/ai';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

import { db } from '../../../config/firebase';
import { Care, Funny, Grrr, Like, Love } from '../../../components/index';
const containerVariants = {
    hidden: {
        opacity: 0,
        y: '1rem',
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .5,
            type: 'spring',
            delay: .5,
        }
    },
};
const reactions = {
    like: {
        color: 'var(--main_bleu_color)',
        icon: <Like />,
        title: "J'aime",
    },
    love: {
        color: 'red',
        icon: <Love />,
        title: "J'adore",
    },
    care: {
        color: 'var(--main_yellow_color)',
        icon: <Care />,
        title: "Solidaire",
    },
    funny: {
        color: 'var(--main_yellow_color)',
        icon: <Funny />,
        title: "Funny",
    },
    grrr: {
        color: 'orangered',
        icon: <Grrr />,
        title: "Grrr",
    },
};



const GiveReaction = ({ setGiveReaction, setUserReaction, handleUserReaction }) => {
    return (
        <motion.div 
            className='give-reaction-wrapper'
            onPointerLeave={ () => setGiveReaction(false) }
            variants={ containerVariants }
            initial='hidden'
            animate='visible'
        >
            <Like 
                animate={ true } 
                setUserReaction={ setUserReaction } 
                setGiveReaction={ setGiveReaction } 
                handleUserReaction={ handleUserReaction }
            />
            <Love 
                animate={ true } 
                setUserReaction={ setUserReaction } 
                setGiveReaction={ setGiveReaction } 
                handleUserReaction={ handleUserReaction }
            />
            <Care 
                setUserReaction={ setUserReaction } 
                setGiveReaction={ setGiveReaction } 
                handleUserReaction={ handleUserReaction }
            />
            <Funny 
                setUserReaction={ setUserReaction } 
                setGiveReaction={ setGiveReaction } 
                handleUserReaction={ handleUserReaction }
            />
            <Grrr 
                setUserReaction={ setUserReaction } 
                setGiveReaction={ setGiveReaction } 
                handleUserReaction={ handleUserReaction }
            />
        </motion.div>
    )
};

const PostFooter = ({ post, inTheComments, setViewPostCommentsModel }) => {
    const [giveReaction, setGiveReaction] = useState(false);
    const [userReaction, setUserReaction] = useState(null);

    useEffect(() => {
        handleUserReaction();
    }, [userReaction]);

    const handleUserReaction = () => {
        // updateDoc(doc(db, 'posts', post.id), {
        //     reaction: userReaction,
        // })
        //     .then(() => {})
        //     .catch((err) => console.error(err));
    };

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
                    onClick={ () => {
                        if (userReaction) {
                            setUserReaction(null);
                        } else {
                            setUserReaction('like');
                            handleUserReaction();
                        }
                        setGiveReaction(false);
                    }}
                    style={{
                        color: userReaction ? reactions[userReaction].color : ''
                    }}
                >
                    { userReaction ? reactions[userReaction].icon : <AiOutlineLike size={ 24 } /> }
                    { userReaction ? reactions[userReaction].title : "J'aime" }
                </button>
                <button
                    onClick={ () => setViewPostCommentsModel(true) }
                    disabled={ inTheComments }
                >
                    <FaRegCommentAlt size={ 20 } />
                    Commenter
                </button>
                <button>
                    <RiShareForwardLine size={ 24 } />
                    Partager
                </button>
            </div>

            { giveReaction &&
                <GiveReaction 
                    setGiveReaction={ setGiveReaction } 
                    setUserReaction={ setUserReaction } 
                    handleUserReaction={ handleUserReaction }
                />
            }
        </div>
    );
};

export default PostFooter;