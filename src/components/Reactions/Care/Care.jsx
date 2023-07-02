import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

import './Care.scss';
import '../reaction.scss';



const Care = ({ setUserReaction, handleUserReaction, setGiveReaction }) => {
    return (
        <div 
            className='reaction care-reaction'
            onClick={ () => {
                handleUserReaction();
                setUserReaction('care');
                setGiveReaction(false);
            }}
        >
            <div className="body">
                <div className="face">
                    <div className="eye left" />
                    <div className="eye right" />
                    <div className="mouth" />
                </div>
                <AiFillHeart size={ 13 } className='heart' />
            </div>
        </div>
    );
};

export default Care;