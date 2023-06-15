import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

import './Care.scss';



const Care = ({ zIndex, setUserReaction, setGiveReaction, handleUserReaction }) => {
    return (
        <div 
            className='reaction care-reaction' 
            style={{ zIndex }}
            onClick={ () => {
                setGiveReaction(false);
                setUserReaction('care');
                handleUserReaction();
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