import React from 'react';

import './Grrr.scss';
import '../reaction.scss';



const Grrr = ({ setUserReaction, handleUserReaction, setGiveReaction }) => {
    return (
        <div
            className='reaction grrr-reaction'
            onClick={ () => {
                handleUserReaction();
                setUserReaction('grrr');
                setGiveReaction(false);
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