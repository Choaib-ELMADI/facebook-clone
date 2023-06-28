import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { IoClose } from 'react-icons/io5';

import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/index';
import './MessengerChat.scss';
import images from '../../constants/images';



const MessengerChat = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({});
    const receiverInfo = useLoaderData();

    useEffect(() => {
        document.title = `${ receiverInfo.userLink } | Facebook`;
    }, [receiverInfo]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const querySnapshot = await getDoc(doc(db, 'users', user.email.split('@')[0]));
            setUserInfo({ ...querySnapshot.data() });
        }
        catch(err) {
            console.error(err);
        };
    }

    return (
        <div className='messenger-chat-container'>
            <Navbar />
            <div className='messenger-chat-container__content'>
                <div className='header'>
                    <Link 
                        className='receiver-profile'
                        to={ `/users/${ receiverInfo.userLink }` }
                    >
                        <img 
                            src={ receiverInfo.userProfile ? receiverInfo.userProfile : images.user_1 } 
                            alt=""
                            draggable='false'
                            loading='lazy'
                            referrerPolicy='no-referrer'
                        />
                        <p>{ receiverInfo.userName ? receiverInfo.userName : 'User' }</p>
                    </Link>
                    <Link 
                        to='/'
                        className='link-to-home'
                    >
                        <IoClose size={ 30 } />
                    </Link>
                </div>
                <div className='messages-container'>
                    <div className='messages-container__messages'></div>
                </div>
                <div className='footer'></div>
            </div>
        </div>
    );
};

export default MessengerChat;

export const ReceiverProfileLoader = async ({ params }) => {
    const { userLink } = params;

    try {
        const querySnapshot = await getDoc(doc(db, 'users', userLink));
        if (querySnapshot.exists()) {
            return querySnapshot.data();
        }
        return null;
    }
    catch(err) {
        console.error(err);
    }
};