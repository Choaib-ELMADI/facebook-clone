import React, { useState, useEffect, useRef } from 'react';
import { Link, Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { getDoc, doc, addDoc, collection, query, where, and, updateDoc, arrayUnion, getDocs, or } from 'firebase/firestore';
import { IoClose, IoSend } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';

import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { Navbar, Message } from '../../components/index';
import './MessengerChat.scss';
import images from '../../constants/images';

const MessageModel = ({ sender }) => {
    return (
        <div className={ sender ? 'message-model sender' : 'message-model' }>
            <div className='message-model__profile' />
            <div className='message-model__message'>
                <div className='message' />
                <div className='moment' />
            </div>
        </div>
    )
};



const MessengerChat = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState({});
    const chatContainerRef = useRef(null);
    const inputMessageRef = useRef(null);
    const receiverInfo = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        document.title = `${ receiverInfo.userLink } | Facebook`;
    }, [receiverInfo]);

    useEffect(() => {
        fetchUser();
        fetchChat();
    }, []);

    const fetchUser = () => {
        getDoc(doc(db, 'users', user.email.split('@')[0]))
            .then((data) => {
                setUserInfo({ ...data.data() });
            })
            .catch((err) => console.error(err));
    };

    const autoResize = (ref) => {
        const current = ref.current;
        current.style.height = 'auto';
        current.style.height = `${ current.scrollHeight }px`;
    };

    useEffect(() => {
        autoResize(inputMessageRef);
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [message]);

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
                            profile: userInfo.userProfile,
                        })
                    })
                        .then(() => {
                            setMessage('');
                            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                            console.log('Messages updated');
                        })
                        .catch((err) => console.log(err));
                } else {
                    addDoc(collection(db, 'chats'), {
                        senderLink: userInfo.userLink,
                        receiverLink: receiverInfo.userLink,
                        messages: [{
                            message: message,
                            sender: userInfo.userLink,
                            time: new Date().getTime(),
                            profile: userInfo.userProfile,
                        }],
                    })
                        .then(() => {
                            setMessage('');
                            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                            console.log('Message added');
                        })
                        .catch((err) => console.log(err));
                }
                fetchChat();
            })
            .catch((err) => console.log(err));
    };

    const fetchChat = () => {
        const q = query(
            collection(db, 'chats'),
            or(
                and(
                    where('senderLink', '==', location.pathname.split('/')[2]),
                    where('receiverLink', '==', receiverInfo.userLink),
                ),
                and(
                    where('senderLink', '==', receiverInfo.userLink),
                    where('receiverLink', '==', location.pathname.split('/')[2]),
                )
            )
        );

        let currentChat = [];

        getDocs(q)
            .then((data) => {
                data.forEach((document) => {
                    currentChat.push({ ...document.data() })
                })
                setChat(currentChat);
                setLoading(false);
            })
            .catch((err) => console.log('3) => ', err));
    };

    const renderContent = () => {
        if (loading) {
            return (
                <>
                    <MessageModel />
                    <MessageModel />
                    <MessageModel sender={ true } />
                </>
            );
        }
            
        if (!chat.length || !chat[0].messages.length) {
            return (
                <div className='no-messages'>
                    <h3>{ `Start a conversation with ${ receiverInfo.userName ? receiverInfo.userName : 'User' }` }</h3>
                </div>
            );
        }

        return (
            [...chat[0].messages].map((message, i) => (
                <Message key={ `message-${ i+1 }` } message={ message } />
            ))
        );
    };

    if (receiverInfo.userLink === user.email.split('@')[0]) {
        return (
            <Navigate to='/404' />
        );
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
                    <div className='links-container'>
                        <div 
                            onClick={ () => navigate(-1) }
                            className='link'
                        >
                            <BiArrowBack size={ 26 } />
                        </div>
                        <Link 
                            to='/'
                            className='link'
                        >
                            <IoClose size={ 30 } />
                        </Link>
                    </div>
                </div>
                <div 
                    className='messages-container'
                    ref={ chatContainerRef }
                >
                    <div className='messages-container__messages'>
                        <div className='receiver-information'>
                            <img 
                                src={ receiverInfo.userProfile ? receiverInfo.userProfile : images.user_1 }
                                alt=''
                                draggable='false'
                                referrerPolicy='no-referrer'
                                loading='lazy'
                            />
                            <h3>{ receiverInfo.userName ? receiverInfo.userName : 'User' }</h3>
                            <Link 
                                to={ `/users/${ receiverInfo.userLink }` }
                                style={{
                                    textDecoration: 'none',
                                    background: 'var(--gray_color_3)',
                                    padding: '.35rem .5rem .25rem .5rem',
                                    borderRadius: '8px',
                                    color: 'var(--gray_color)'
                                }}
                            >Voir profile</Link>
                        </div>
                        { renderContent() }
                    </div>
                </div>
                <div className='footer'>
                    <div className='message-container'>
                        <textarea
                            ref={ inputMessageRef }
                            className='message'
                            onChange={ (e) => setMessage(e.target.value) }
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
    const { receiverLink } = params;

    try {
        const querySnapshot = await getDoc(doc(db, 'users', receiverLink));
        if (querySnapshot.exists()) {
            return querySnapshot.data();
        }
        return null;
    }
    catch(err) {
        console.error(err);
    }
};