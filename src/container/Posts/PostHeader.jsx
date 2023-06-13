import React, { useState, useRef, useEffect } from 'react';
import { TbDots } from 'react-icons/tb';
import { CgClose } from 'react-icons/cg';
import { IoEarth } from 'react-icons/io5';



const PostHeader = ({ post }) => {
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
        <div className='post-header'>
            { viewUserModel &&
                <div 
                    className='user-model'
                    ref={ userModelRef }
                >
                    <h1>I'm the user model</h1>
                </div>
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
            <div className='post-header__remove'><CgClose size={ 26 } /></div>
        </div>
    );
};

export default PostHeader;