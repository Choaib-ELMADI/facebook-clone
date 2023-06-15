import React from 'react';

import './Funny.scss';



const Funny = ({ zIndex, setUserReaction, setGiveReaction, handleUserReaction }) => {
    return (
        <div 
            className='reaction funny-reaction'
            style={{ zIndex }}
            onClick={ () => {
                setGiveReaction(false);
                setUserReaction('funny');
                handleUserReaction();
            }}
        >
            <div className="eye left" />
            <div className="eye right" />
            <div className="mouth" />
        </div>
    );
};

export default Funny;