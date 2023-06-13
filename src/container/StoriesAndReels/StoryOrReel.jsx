import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlayFill } from 'react-icons/bs';

import './StoryOrReel.scss';



const StoryOrReel = ({ props }) => {
    return (
        <Link 
            className='story-reel-wrapper'
        >
            <div className='overlay' />
            <img src={ props.cover } alt={ props.userName } />
            { props.type === 'stories' ?
                <>
                    <p className='display-user-name'>{ props.userName }</p> 
                    <div className='display-user-profile'>
                        <img src={ props.userProfile } alt={ props.userName } />
                    </div>
                </> 
                :
                <p className='display-views'>
                    <span><BsPlayFill size={ 20 } /></span>
                    { props.views }
                </p>
            }
        </Link>
    );
};

export default StoryOrReel;