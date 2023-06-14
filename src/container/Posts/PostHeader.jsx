import React, { useState, useRef, useEffect } from 'react';
import { TbDots } from 'react-icons/tb';
import { CgClose } from 'react-icons/cg';
import { IoEarth } from 'react-icons/io5';
import { AiFillInfoCircle } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';
import { FaCalendarCheck } from 'react-icons/fa';
import { BsMessenger } from 'react-icons/bs';



const UserModel = ({ post, userModelRef }) => {
    return (
        <div 
            className='user-model'
            ref={ userModelRef }
        >
            <div className='user-model__details'>
                <div className='profile'>
                    <img 
                        src={ post.userProfile } 
                        alt={ post.userName }
                    />
                </div>
                <div className='info'>
                    <h2>{ post.userName }</h2>
                    <p>
                        <AiFillInfoCircle size={ 25 } />
                        Page
                    </p>
                    <a 
                        href='https://choaibelmadi.netlify.app'
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

const PostHeader = ({ post, setHidePost }) => {
    const [viewUserModel, setViewUserModel] = useState(false);
    const headerProfileRef = useRef(null);
    const userModelRef = useRef(null);

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
                    post={ post} 
                    userModelRef={ userModelRef } 
                /> 
            }

            <div 
                className='post-header__profile'
                ref={ headerProfileRef }
            >
                <img src={ post.userProfile } alt={ post.userName } />
            </div>
            <div className='post-header__user-date'>
                <p>{ post.userName }</p>
                <p>
                    { post.date }{ '.' }
                    <IoEarth />
                </p>
            </div>
            <div className='post-header__options'><TbDots size={ 26 } /></div>
            <div 
                className='post-header__remove'
                onClick={ () => setHidePost(true) }
            ><CgClose size={ 26 } /></div>
        </div>
    );
};

export default PostHeader;