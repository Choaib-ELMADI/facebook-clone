import React, { useState, useEffect } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { RiShareForwardLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { AiOutlineLike } from 'react-icons/ai';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

import './PostFooter.scss';
import { db } from '../../../../config/firebase';
import { Care, Funny, Grrr, Like, Love } from '../../../../components/index';
import { useAuth } from '../../../../context/AuthContext';
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

const PostFooter = ({ post, inTheComments, setViewPostCommentsModel, fetchPosts }) => {
    const { user } = useAuth();
    const [giveReaction, setGiveReaction] = useState(false);
    const [reactionCounts, setReactionCounts] = useState([
        {type: 'like',  count: 0},
        {type: 'love',  count: 0},
        {type: 'care',  count: 0},
        {type: 'sad',   count: 0},
        {type: 'grrr',  count: 0},
        {type: 'wouah', count: 0},
    ]);
    const [userReaction, setUserReaction] = useState(
        post.reactions[
            post.reactions.findIndex(
                (reaction) => reaction.userId === user.uid
            )
        ]?.reactionType || null
    );

    useEffect(() => {
        handleUserReaction();
    }, [userReaction]);

    // useEffect(() => {
    //     handleReactionCounts();
    // }, [userReaction]); 
    
    const handleUserReaction = () => {
        const reaction = {
            postId: post.id,
            userId: user.uid,
            reactionType: userReaction,
        };
    
        const postRef = doc(db, 'posts', post.id);
    
        getDoc(postRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const existingReactions = docSnapshot.data().reactions || [];

                    const reactionIndex = existingReactions.findIndex(
                        (reaction) => reaction.userId === user.uid
                    );
    
                    if (reactionIndex > -1) {
                        existingReactions[reactionIndex].reactionType = userReaction;
                    } else {
                        existingReactions.push(reaction);
                    }
    
                    updateDoc(postRef, {
                        reactions: existingReactions,
                    })
                        .then(() => fetchPosts())
                        .catch((err) => console.error(err));
                }
            })
            .catch((err) => console.error(err));
    };

    const handleLikeReaction = () => {
        if (userReaction) {
            setUserReaction(null);
        } else {
            setUserReaction('like');
        }
        setGiveReaction(false);
    };

    // const handleReactionCounts = () => {    
    //     const postRef = doc(db, 'posts', post.id);
    
    //     getDoc(postRef)
    //         .then((docSnapshot) => {
    //             if (docSnapshot.exists()) {
    //                 const existingReactions = docSnapshot.data().reactions || [];

    //                 const availableReactions = [];
    //                 existingReactions.forEach(reaction => {
    //                     availableReactions.push(reaction.reactionType);
    //                 })

    //                 for (let i = 0; i < availableReactions.length; i++) {
    //                     const reaction = availableReactions[i];
    //                     const reactionObj = reactionCounts.find(obj => obj.type === reaction);

    //                     if (reactionObj) {
    //                         setReactionCounts([
    //                             ...reactionCounts,
    //                             { type: reactionObj.type, count: reactionObj.count++ }
    //                         ]);
    //                     }
    //                 }
    //             }
    //         })
    //         .catch((err) => console.error(err));
    // };

    return (
        <div 
            className='post-footer'
            onPointerLeave={ () => setGiveReaction(false) }
        >
            <div className='post-numbers'>
                <div className='reactions'>
                    { console.table(reactionCounts) }
                    <Like zIndex={ 3 } />
                    <Love zIndex={ 2 } />
                    <Care zIndex={ 1 } />
                </div>
                <div className='comments-share'>
                    <p className='comments'>
                        { post.comments ? post.comments.length : 0 }
                        <FaRegCommentAlt size={ 17 } />
                    </p>
                </div>
            </div>
            <div className='line' />
            <div className='action-buttons'>
                <button
                    onPointerEnter={ () => setGiveReaction(true) }
                    onClick={ handleLikeReaction }
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

            { giveReaction && (
                <GiveReaction 
                    setGiveReaction={ setGiveReaction } 
                    setUserReaction={ setUserReaction } 
                    handleUserReaction={ handleUserReaction }
                />
            )}
        </div>
    );
};

export default PostFooter;