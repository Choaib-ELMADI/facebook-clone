import React from 'react';

import './Grrr.scss';



const Grrr = ({ zIndex, setUserReaction, setGiveReaction, handleUserReaction }) => {
    return (
        <div
            className='reaction grrr-reaction' 
            style={{ zIndex }}
            onClick={ () => {
                setGiveReaction(false);
                setUserReaction('grrr');
                handleUserReaction();
            }}
        >
            <div className="face">
                <div className='eye left' />
                <div className='eye right' />
                <div className='mouth' />
            </div>
        </div>
    );
};

export default Grrr;