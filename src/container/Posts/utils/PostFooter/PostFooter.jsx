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
            delay: .3,
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



const GiveReaction = ({ setUserReaction, handleUserReaction, setGiveReaction }) => {
    return (
        <motion.div 
            className='give-reaction-wrapper'
            variants={ containerVariants }
            initial='hidden'
            animate='visible'
        >
            <Like 
                animate={ true } 
                setUserReaction={ setUserReaction } 
                handleUserReaction={ handleUserReaction }
                setGiveReaction={ setGiveReaction }
            />
            <Love 
                animate={ true } 
                setUserReaction={ setUserReaction } 
                handleUserReaction={ handleUserReaction }
                setGiveReaction={ setGiveReaction }
            />
            <Care 
                setUserReaction={ setUserReaction } 
                handleUserReaction={ handleUserReaction }
                setGiveReaction={ setGiveReaction }
            />
            <Funny 
                setUserReaction={ setUserReaction } 
                handleUserReaction={ handleUserReaction }
                setGiveReaction={ setGiveReaction }
            />
            <Grrr 
                setUserReaction={ setUserReaction } 
                handleUserReaction={ handleUserReaction }
                setGiveReaction={ setGiveReaction }
            />
        </motion.div>
    )
};

const PostFooter = ({ post, inTheComments, setViewPostCommentsModel, responsesNumber }) => {
    const { user } = useAuth();
    const [giveReaction, setGiveReaction] = useState(false);
    const [userReaction, setUserReaction] = useState(
        post.reactions[
            post.reactions.findIndex(
                (reaction) => reaction.userId === user.uid
            )
        ]?.reactionType || null
    );
    const [reactionCounts, setReactionCounts] = useState({});

    useEffect(() => {
        handleUserReaction();
    }, [userReaction]);

    useEffect(() => {
        const currentReactionCounts = {};

        for (const reaction of post.reactions.filter(r => r.reactionType)) {
            const { reactionType } = reaction;
            if (reactionType in currentReactionCounts) {
                currentReactionCounts[reactionType]++;
            } else {
                currentReactionCounts[reactionType] = 1;
            }
        };

        const sortedReactionCounts = Object.entries(currentReactionCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .reduce((sortedObj, [reactionType, count]) => {
                sortedObj[reactionType] = count;
                return sortedObj;
            }, {});

        setReactionCounts(sortedReactionCounts);
    }, [userReaction]);
    
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
                        .then(() => {})
                        .catch((err) => console.error(err));
                }
            })
            .catch((err) => console.error(err));
    };

    const handleGiveReaction = () => {
        if (userReaction) {
            setUserReaction(null);
        } else {
            setGiveReaction(!giveReaction);
        }
    };

    return (
        <div className='post-footer'>
            { (Object.keys(reactionCounts).length || (post.comments && post.comments.length)) && (
                <div className='post-numbers'>
                    <div className='reactions'>
                        { Object.keys(reactionCounts).length >= 1 && reactions[Object.keys(reactionCounts)[0]].icon }
                        { Object.keys(reactionCounts).length >= 2 && reactions[Object.keys(reactionCounts)[1]].icon }
                        { Object.keys(reactionCounts).length >= 3 && reactions[Object.keys(reactionCounts)[2]].icon }
                    </div>
                    <div className='comments-share'>
                        <p className='comments'>
                            { post.comments ? post.comments.length + responsesNumber : 0 }
                            <FaRegCommentAlt size={ 17 } />
                        </p>
                    </div>
                </div>
            )}
            <div className='action-buttons'>
                <button
                    onClick={ handleGiveReaction }
                    style={{
                        color: userReaction ? reactions[userReaction].color : ''
                    }}
                >
                    { userReaction ? reactions[userReaction].icon : <AiOutlineLike size={ 24 } /> }
                    { userReaction ? reactions[userReaction].title : "J'aime" }
                </button>
                <button
                    onClick={ () => {
                        
                        setViewPostCommentsModel(true)} }
                   // disabled={ inTheComments }
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
                    setUserReaction={ setUserReaction } 
                    handleUserReaction={ handleUserReaction }
                    setGiveReaction={ setGiveReaction }
                />
            )}
        </div>
    );
};

export default PostFooter;