import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { query, collection, or, getDocs, where } from 'firebase/firestore';

import { db } from '../../config/firebase';
import './MessageUsers.scss';
import { Messenger, Navbar } from '../index';



const MessageUsers = () => {
    const location = useLocation();
    const [recentChats, setRecentChats] = useState([]);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = () => {
        let myRecentChats = [];

        const q = query(
            collection(db, 'chats'),
            or(
                where('senderLink', '==', location.pathname.split('/')[2]),
                where('receiverLink', '==', location.pathname.split('/')[2]),
            )
        );

        getDocs(q)
            .then((data) => {
                data.docs.forEach((doc => {
                    if (doc.data().messages.length) {
                        myRecentChats.push({ ...doc.data() })
                    }
                }));
                setRecentChats(myRecentChats);
            })
            .catch((err) => console.error(err));
    };


    return (
        <div className='message-users-container'>
            <Navbar />
            <Messenger />


            {/* //TODO: Recent Chats */}
            {
                recentChats.length < 1 ?
                <h3>No recent chats</h3>
                :
                <>
                    {
                        recentChats.map((recentChat, i) => (
                            <Link
                                to='/'
                                key={ `recent-${ i+1 }` }
                            >
                                { recentChat.senderLink }
                            </Link>
                        ))
                    }
                </>
            }
        </div>
    );
};

export default MessageUsers;