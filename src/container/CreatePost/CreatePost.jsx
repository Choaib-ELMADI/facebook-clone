import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { RiVideoAddFill } from 'react-icons/ri';
import { IoMdPhotos } from 'react-icons/io';
import { CgSmileMouthOpen } from 'react-icons/cg';

import './CreatePost.scss';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import images from '../../constants/images';
import CreatePostModel from './CreatePostModel';



const CreatePost = ({ fetchPosts }) => {
    const [viewCreatingPostModel, setViewCreatingPostModel] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const { user } = useAuth();
    
    useEffect(() => {
        fetchUserInfo();
    }, [user]);
    
    const fetchUserInfo = () => {
        const q = query(collection(db, 'users'), where('userId', '==', user.uid));
        getDocs(q)
            .then(data => {
                data.forEach(d => {
                    setUserInfo({ ...d.data() })
                })
            })
            .catch(err => console.error(err));
    };

    return (
        <div className='create-post'>
            <div className='user-select'>
                <img 
                    src={ userInfo.userProfile ? userInfo.userProfile : images.user_1 } 
                    alt=''
                    loading='lazy'
                    referrerPolicy="no-referrer"
                    style={{ background: 'var(--gray_color)' }}
                    draggable='false'
                />
                <button
                    onClick={ () => setViewCreatingPostModel(true) }
                >
                    { `Quoi de neuf, ${ userInfo.userName ? userInfo.userName : 'User' } ?` }
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
                    userInfo={ userInfo }
                />
            }
        </div>
    );
};

export default CreatePost;