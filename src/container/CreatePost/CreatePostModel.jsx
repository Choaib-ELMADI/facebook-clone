import React, { useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { IoMdPhotos } from 'react-icons/io';
import { setDoc, doc } from 'firebase/firestore';

import { db } from '../../config/firebase';
import './CreatePostModel.scss';
import { useAuth } from '../../context/AuthContext';
import images from '../../constants/images';



const CreatePostModel = ({ setViewCreatingPostModel, fetchPosts }) => {
    const [postContent, setPostContent] = useState('');
    const [hasImage, setHasImage] = useState(false);
    const inputRef = useRef(null);
    const { user } = useAuth();

    const autoResize = () => {
        const input = inputRef.current;
        input.style.height = 'auto';
        input.style.height = `${ input.scrollHeight }px`;
    };

    const handleSubmitPost = () => {
        const id = new Date().getTime() + '__' + user.email.split('@')[0];
        setDoc(doc(db, 'posts', id), {
            postContent: postContent,
            email: user.email,
            name: user.displayName || 'User',
            time: new Date().getTime(),
            hasImage: false,
        })
        .then(() => {
            setPostContent('');
            setViewCreatingPostModel(false);
            fetchPosts();
        })
        .catch((err) => console.error(err));
    };
    
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
                        src={ user && user?.photoURL ? user.photoURL : images.user_1 } 
                        alt={ user && user?.displayName ? user.displayName : 'user profile' } 
                    />
                    <div className='user__details'>
                        <p>{ user && user?.displayName ? user.displayName : 'user' }</p>
                        <p>Public</p>
                    </div>
                </div>
                <div className='new-post-content-wrapper'>
                    <div className='container'>
                        <textarea 
                            type="text" 
                            placeholder={ `Quoi de neuf, ${ user && user?.displayName ? user.displayName : 'User' }` }
                            name='postContent'
                            ref={ inputRef }
                            value={ postContent }
                            onChange={ (e) => {
                                setPostContent(e.target.value);
                                autoResize();
                            }}
                            style={{ resize: 'none' }}
                        ></textarea>
                        <div className='add-photo'>
                            <input type="file" name="addPhoto" id="addPhoto" hidden />
                            <label htmlFor="addPhoto">
                                <div className='input'>
                                    <span><IoMdPhotos size={ 26 } /></span>
                                    <h3>Ajouter des photos/vidéos</h3>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <button 
                        disabled={ postContent === '' }
                        onClick={ handleSubmitPost }
                    >Publier</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModel;