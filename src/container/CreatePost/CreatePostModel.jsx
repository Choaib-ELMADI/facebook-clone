import React, { useRef, useState, useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { IoMdPhotos } from 'react-icons/io';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, store } from '../../config/firebase';
import './CreatePostModel.scss';
import { useAuth } from '../../context/AuthContext';
import images from '../../constants/images';



const CreatePostModel = ({ setViewCreatingPostModel, fetchPosts, userInfo }) => {
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [hasImage, setHasImage] = useState(false);
    const [loading, setLoading] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const inputRef = useRef(null);
    const { user } = useAuth();
    const [postDetails, setPostDetails] = useState({
        name: userInfo.userName || 'User',
        email: userInfo.userEmail,
        profile: userInfo.userProfile,
        userId: user.uid,
        time: new Date().getTime(),
        year: new Date().getFullYear(),
        hasImage: false,
        reactions: [],
    });

    const autoResize = () => {
        const input = inputRef.current;
        input.style.height = 'auto';
        input.style.height = `${ input.scrollHeight }px`;
    };

    const handleSubmitPost = () => {
        const id = new Date().getTime() + '__' + user.email.split('@')[0].replaceAll('.', '');
        setDoc(doc(db, 'posts', id), {
            ...postDetails,
            id: id,
            hasImage: hasImage,
        })
        .then(() => {
            setViewCreatingPostModel(false);
            setPostContent('');
            setPostImage(null);
            fetchPosts();
        })
        .catch((err) => console.error(err));
    };

    const handlePostContent = () => {
        autoResize();
        setPostDetails(
            (prev) => ({ ...prev, postContent: postContent })
        );
    };

    const handlePostImage = (e) => {
        setPostImage(e.target.files[0]);
    };

    useEffect(() => {
        setPostDetails(
            (prev) => ({ ...prev, postContent: postContent })
        );
    }, [postContent]);

    useEffect(() => {
        const uploadPostImage = () => {
            const postImageRef = ref(store, `/${ user.uid }/${ new Date().getTime() }__${ postImage.name }`);
            const uploadTask = uploadBytesResumable(postImageRef, postImage);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setLoading(progress);
                }, 
                (error) => {
                    console.error(error);
                }, 
                () => {
                    setHasImage(true);
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setPostDetails(
                                (prev) => ({ ...prev, image: downloadURL })
                            );
                        });
                }
            );
        };
        postImage && uploadPostImage();
    }, [postImage]);
    
    return (
        <div className='create-new-post-wrapper'>
            <div className='create-new-post-wrapper__container'>
                <div className='header'>
                    <h2>Créer une publication</h2>
                    <span 
                        className='close-icon'
                        onClick={ () => setViewCreatingPostModel(false) }
                    >
                        <GrClose size={ 24 } />
                    </span>
                </div>
                <div className="user">
                    <img 
                        src={ userInfo.userProfile ? userInfo.userProfile : images.user_1 } 
                        alt=''
                        loading='lazy'
                        referrerPolicy="no-referrer"
                        style={{ background: 'var(--gray_color)' }}
                        draggable='false'
                    />
                    <div className='user__details'>
                        <p>{ userInfo.userName ? userInfo.userName : 'user' }</p>
                        <p>Public</p>
                    </div>
                </div>
                <div className='new-post-content-wrapper'>
                    <div className='container'>
                        <textarea 
                            type="text" 
                            placeholder={ `Quoi de neuf, ${ userInfo.userName ? userInfo.userName : 'User' } ?` }
                            name='postContent'
                            ref={ inputRef }
                            value={ postContent }
                            onChange={ (e) => {
                                setPostContent(e.target.value);
                                handlePostContent();
                            }}
                            style={{ resize: 'none' }}
                        ></textarea>
                        <div className='add-photo'>
                            <input 
                                type="file" 
                                name="addPhoto" 
                                id="addPhoto"
                                onChange={ handlePostImage }
                                hidden
                            />
                            <label htmlFor="addPhoto">
                                { !hasImage ?
                                    <div className='input'>
                                        <span><IoMdPhotos size={ 26 } /></span>
                                        <h3>Ajouter des photos/vidéos</h3>
                                    </div>
                                    :
                                    <img 
                                        src={ URL.createObjectURL(postImage) }
                                        alt='post image'
                                        loading='lazy'
                                        draggable='false'
                                        onLoad={ () => setIsLoaded(true) }
                                    />
                                }
                            </label>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <button 
                        disabled={ 
                            (postContent === '' && postImage === null) ||
                            (postImage !== null && loading !== 100 && !isLoaded)
                        }
                        onClick={ handleSubmitPost }
                    >Publier</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModel;