import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { motion } from 'framer-motion';

import './Like.scss';
import '../reaction.scss';
const likeVariants = {
    visible: {
        scale: [1, .8, 1.1],
        rotateZ: [0, 2, -6],
        transition: {
            duration: .7,
            delay: .1,
            repeatType: 'reverse',
            repeat: Infinity
        }
    },
};



const Like = ({ animate, setUserReaction, handleUserReaction, setGiveReaction }) => {
    return (
        <div 
            className='reaction like-reaction'
            onClick={ () => {
                handleUserReaction();
                setUserReaction('like');
                setGiveReaction(false);
            }}
        >
            { animate ?
                <motion.span
                    variants={ likeVariants }
                    animate='visible'
                >
                    <AiFillLike color='var(--white_color)' />
                </motion.span>
                :
                <AiFillLike color='var(--white_color)'  style={{ transform: 'translateY(-1px)' }} />
            }
        </div>
    );
};

export default Like;