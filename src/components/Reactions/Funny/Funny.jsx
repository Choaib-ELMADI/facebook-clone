import React from 'react';

import './Funny.scss';
import '../reaction.scss';



const Funny = ({ setUserReaction, handleUserReaction, setGiveReaction }) => {
    return (
        <div 
            className='reaction funny-reaction'
            onClick={ () => {
                handleUserReaction();
                setUserReaction('funny');
                setGiveReaction(false);
            }}
        >
            <div className="eye left" />
            <div className="eye right" />
            <div className="mouth" />
        </div>
    );
};

export default Funny;