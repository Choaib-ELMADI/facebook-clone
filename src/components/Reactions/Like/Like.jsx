import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { motion } from 'framer-motion';

import './Like.scss';
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



const Like = ({ zIndex, animate }) => {
    return (
        <div className='reaction like-reaction' style={{ zIndex }}>
            { animate ?
                <motion.span
                    variants={ likeVariants }
                    animate='visible'
                >
                    <AiFillLike color='var(--white_color)' />
                </motion.span>
                :
                <AiFillLike color='var(--white_color)' />
            }
        </div>
    );
};

export default Like;