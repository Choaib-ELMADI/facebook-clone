import React, { useState, useEffect, useRef } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getDoc, doc, addDoc, collection, query, where, and, updateDoc, arrayUnion, getDocs, or } from 'firebase/firestore';
import { IoClose, IoSend } from 'react-icons/io5';

import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/index';
import './MessengerChat.scss';
import images from '../../constants/images';



const MessengerChat = () => {
    const inputMessageRef = useRef(null);
    const [message, setMessage] = useState('');
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
    };

    useEffect(() => {
    }, [message]);

    const autoResize = (ref) => {
        const current = ref.current;
        current.style.height = 'auto';
        current.style.height = `${ current.scrollHeight }px`;
    };

    const handleSendMessage = () => {
        const q = query(
            collection(db, 'chats'),
            or(
                and(
                    where('senderLink', '==', userInfo.userLink),
                    where('receiverLink', '==', receiverInfo.userLink),
                ),
                and(
                    where('senderLink', '==', receiverInfo.userLink),
                    where('receiverLink', '==', userInfo.userLink),
                )
            )
        );

        getDocs(q)
            .then((data) => {
                if (!data.empty) {
                    updateDoc(doc(db, 'chats', data.docs[0].id), {
                        messages: arrayUnion({
                            message: message,
                            sender: userInfo.userLink,
                            time: new Date().getTime(),
                        })
                    })
                        .then(() => {
                            setMessage('');
                            console.log('Messages updated');
                        })
                        .catch((err) => console.log('1) => ', err));
                } else {
                    addDoc(collection(db, 'chats'), {
                        senderLink: userInfo.userLink,
                        receiverLink: receiverInfo.userLink,
                        messages: [{
                            message: message,
                            sender: userInfo.userLink,
                            time: new Date().getTime(),
                        }],
                    })
                        .then(() => {
                            setMessage('');
                            console.log('Message added');
                        })
                        .catch((err) => console.log('2) => ', err));
                }
            })
            .catch((err) => console.log('3) => ', err));
    };

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
                    <div className='messages-container__messages'>

                    </div>
                </div>
                <div className='footer'>
                    <div className='message-container'>
                        <textarea
                            ref={ inputMessageRef }
                            className='message'
                            onChange={ (e) => {
                                setMessage(e.target.value);
                                autoResize(inputMessageRef);
                            }}
                            value={ message }
                        ></textarea>
                    </div>
                    <button
                        disabled={ message === '' }
                        onClick={ () => handleSendMessage() }
                    >
                        <IoSend size='22' />
                    </button>
                </div>
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