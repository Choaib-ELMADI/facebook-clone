import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';

import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/index';
import './MessengerChat.scss';



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
                <h3>Sender: { userInfo.userLink }</h3>
                <h3>Receiver: { receiverInfo.userLink }</h3>
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