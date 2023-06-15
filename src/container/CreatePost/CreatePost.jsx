import React, { useState } from 'react';
import { RiVideoAddFill } from 'react-icons/ri';
import { IoMdPhotos } from 'react-icons/io';
import { CgSmileMouthOpen } from 'react-icons/cg';

import './CreatePost.scss';
import { useAuth } from '../../context/AuthContext';
import images from '../../constants/images';
import CreatePostModel from './CreatePostModel';



const CreatePost = ({ fetchPosts }) => {
    const [viewCreatingPostModel, setViewCreatingPostModel] = useState(false);
    const { user } = useAuth();

    return (
        <div className='create-post'>
            <div className='user-select'>
                <img 
                    src={ user && user?.photoURL ? user?.photoURL : images.user_1 } 
                    alt={ user && user?.displayName ? user?.displayName : 'user profile' }
                />
                <button
                    onClick={ () => setViewCreatingPostModel(true) }
                >
                    { `Quoi de neuf, ${ user && user?.displayName ? user?.displayName : 'User' } ?` }
                </button>
            </div>
            <div className='line' />
            <div className='posts-types'>
                <div 
                    className='post-type'
                    onClick={ () => setViewCreatingPostModel(true) }
                >
                    <RiVideoAddFill size={ 28 } color='red' />
                    <span>Vidéo en direct</span>
                </div>
                <div 
                    className='post-type'
                    onClick={ () => setViewCreatingPostModel(true) }
                >
                    <IoMdPhotos size={ 28 } color='green' />
                    <span>Photo / vidéo</span>
                </div>
                <div 
                    className='post-type'
                    onClick={ () => setViewCreatingPostModel(true) }
                >
                    <CgSmileMouthOpen size={ 30 } color='rgb(255, 195, 0)' />
                    <span>Humeur / activité</span>
                </div>
            </div>

            { viewCreatingPostModel &&
                <CreatePostModel 
                    setViewCreatingPostModel={ setViewCreatingPostModel }
                    fetchPosts={ fetchPosts } 
                />
            }
        </div>
    );
};

export default CreatePost;