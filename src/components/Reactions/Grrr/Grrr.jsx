import React from 'react';

import './Grrr.scss';



const Grrr = ({ zIndex, setUserReaction, setGiveReaction }) => {
    return (
        <div
            className='reaction grrr-reaction' 
            style={{ zIndex }}
            onClick={ () => {
                setGiveReaction(false);
                setUserReaction('grrr');
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