import React from 'react';
import moment from 'moment';

import images from '../../../../constants/images'
import './Response.scss';



const Response = ({ res }) => {
    return (
        <div className='comment-responses__response'>
            <div className='prof'>
                <img
                    src={ res.responderProfile ? res.responderProfile : images.user_1 } 
                    alt=''
                    loading='lazy'
                    referrerPolicy='no-referrer'
                    style={{ background: 'var(--gray_color)' }}
                    draggable='false'
                />
            </div>
            <div className='response-wrapper'>
                <div className='res'>
                    <p>{ res.responderName }</p>
                    <p>{ res.response }</p>
                </div>
                <p className='time'>{ moment(res.time).fromNow() }</p>
            </div>
        </div>
    );
};

export default Response;