import React, { useState } from 'react';
import { TbUpload } from 'react-icons/tb';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { updateDoc, doc } from 'firebase/firestore';
import { db, store } from '../../../../config/firebase';
import { useAuth } from '../../../../context/AuthContext';
import './BannerModel.scss';



const BannerModel = ({ setViewBannerModel }) => {
    const { user } = useAuth();
    const [newBanner, setNewBanner] = useState(null);

    const handleUpdateBanner = () => {
        if (!newBanner) return;

        const storageRef = ref(store, `${ user.uid }/${ new Date().getTime() }__${ newBanner.name }`);
        const uploadTask = uploadBytesResumable(storageRef, newBanner);

        uploadTask.on('state_changed', 
            (snapshot) => {}, 
            (error) => console.error(error), 
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        updateDoc(doc(db, 'users', user.email.split('@')[0]), {
                            userBanner: downloadURL
                        })
                            .then(() => setViewBannerModel(false))
                            .catch((err) => console.error(err));
                    });
            }
        );
    };

    return (
        <div className='banner-model-wrapper'>
            <div className='banner-model-content'>
                <span 
                    className='close'
                    onClick={ () => setViewBannerModel(false) }
                >X</span>
                <h3 className='title'>Mettre à jour la photo de couverture</h3>

                { newBanner && (
                    <div className='new-banner-container'>
                        <img 
                            src={ URL.createObjectURL(newBanner) } 
                            alt=""
                            loading='lazy'
                            draggable='false'
                        />

                        <div className='new-banner-footer'>
                            <button
                                onClick={ () => setViewBannerModel(false) }
                            >Annuler</button>
                            <button 
                                className='save'
                                onClick={ handleUpdateBanner }
                            >Enregistrer</button>
                        </div>
                    </div>
                )}

                { !newBanner && (
                    <div className='new-banner-input'>
                        <input 
                            type="file"
                            onChange={ (e) => setNewBanner(e.target.files[0]) }
                            id='new-banner-input'
                            hidden
                        />
                        <label htmlFor="new-banner-input">
                            <span>
                                <TbUpload size={ 24 } />
                            </span>
                            Importer une photo
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerModel;