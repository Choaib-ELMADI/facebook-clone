import React from 'react';
import moment from 'moment';

import './Message.scss';
import images from '../../constants/images';
import { useAuth } from '../../context/AuthContext';



const Message = ({ message }) => {
    const { sender, time, profile } = message;
    const { user } = useAuth();

    return (
        <div className={ user.email.split('@')[0].replaceAll('.', '') === sender ? 'message-wrapper sender' : 'message-wrapper' }>
            <div className='profile-message'>
                <div className='profile'>
                    <img 
                        src={ profile ? profile : images.user_1 }
                        alt=""
                        draggable='false'
                        loading='lazy'
                        referrerPolicy='no-referrer'
                    />
                </div>
                <p className='actuel-message'>{ message.message }</p>
            </div>
            <p className='moment'>{ moment(time).fromNow() }</p>
        </div>
    );
};

export default Message;