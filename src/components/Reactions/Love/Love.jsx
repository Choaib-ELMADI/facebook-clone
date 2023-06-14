import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';

import './Love.scss';
const loveVariants = {
    visible: {
        scale: [1, .8, 1.1],
        transition: {
            duration: .8,
            delay: .1,
            repeatType: 'reverse',
            repeat: Infinity,
        }
    },
};



const Love = ({ zIndex, animate }) => {
    return (
        <div className='reaction love-reaction' style={{ zIndex }}>
            { animate ? 
                <motion.span
                    variants={ loveVariants }
                    animate='visible'
                >
                    <AiFillHeart 
                        color='var(--white_color)'
                        style={{
                            transform: 'translateY(2px)'
                        }}
                    />
                </motion.span>
                :
                <AiFillHeart color='var(--white_color)' />
            }
        </div>
    );
};

export default Love;