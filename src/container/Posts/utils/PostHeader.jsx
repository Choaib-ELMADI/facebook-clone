import React, { useState, useRef, useEffect } from 'react';
import moment from "moment";
import { TbDots } from 'react-icons/tb';
import { CgClose } from 'react-icons/cg';
import { IoEarth } from 'react-icons/io5';
import { AiFillInfoCircle } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';
import { FaCalendarCheck } from 'react-icons/fa';
import { BsMessenger } from 'react-icons/bs';

import images from '../../../constants/images';



const UserModel = ({ post, userModelRef }) => {
    const { postContent, email, name, profile, time, hasImage } = post;

    return (
        <div 
            className='user-model'
            ref={ userModelRef }
        >
            <div className='user-model__details'>
                <div className='profile'>
                    <img 
                        src={ profile ? profile : images.user_1 } 
                        alt=''
                        loading='lazy'
                        referrerPolicy="no-referrer"
                        style={{ background: 'var(--gray_color)' }}
                        draggable='false'
                    />
                </div>
                <div className='info'>
                    <h2>{ name }</h2>
                    <p>
                        <AiFillInfoCircle size={ 25 } />
                        Page
                    </p>
                    <a 
                        href='https://elmadichoaib.vercel.app'
                        target='_blank'
                        rel='noreferror'
                    >
                        <TbWorld size={ 25 } color='var(--gray_color)' />
                        choaibelmadi
                    </a>
                    <p>
                        <FaCalendarCheck size={ 24 } />
                        375k followers
                    </p>
                </div>
            </div>
            <div className='user-model__buttons'>
                <button>
                    <BsMessenger size={ 20 } />
                    Message
                </button>
                <button>
                    <FaCalendarCheck size={ 20 } color='rgba(0, 0, 0, .8)' />
                    Suivi(e)
                </button>
            </div>
        </div>
    );
};

const PostHeader = ({ post, setHidePost, inTheComments }) => {
    const [viewUserModel, setViewUserModel] = useState(false);
    const headerProfileRef = useRef(null);
    const userModelRef = useRef(null);

    const { postContent, email, name, profile, time, hasImage } = post;

    useEffect(() => {
        const headerProfile = headerProfileRef.current;
        const userModel = userModelRef.current;

        headerProfile.addEventListener('pointerenter', () => {
            setViewUserModel(true);
        });

        headerProfile.addEventListener('click', () => {
            setViewUserModel(false);
        });

        if (viewUserModel) {
            userModel.addEventListener('mouseleave', () => {
                setViewUserModel(false);
            });
        }
    }, [viewUserModel]);

    return (
        <div 
            className='post-header'
            onPointerLeave={ () => setViewUserModel(false) }
        >
            { viewUserModel && 
                <UserModel 
                    post={ post } 
                    userModelRef={ userModelRef } 
                /> 
            }

            <div 
                className='post-header__profile'
                ref={ headerProfileRef }
            >
                <img 
                    src={ profile ? profile : images.user_1 } 
                    alt=''
                    loading='lazy'
                    referrerPolicy="no-referrer"
                    style={{ background: 'var(--gray_color)' }}
                    draggable='false'
                />
            </div>
            <div className='post-header__user-date'>
                <p>{ name }</p>
                <p>
                    { moment(time).fromNow() }
                    { '.' }
                    <IoEarth />
                </p>
            </div>
            <div className='post-header__options'><TbDots size={ 26 } /></div>
            <div 
                className='post-header__remove'
                onClick={ () => setHidePost(true) }
                style={{
                    display: inTheComments ? 'none' : ''
                }}
            >
                <CgClose size={ 26 } />
            </div>
        </div>
    );
};

export default PostHeader;