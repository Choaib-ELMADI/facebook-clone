import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from 'firebase/firestore';

import './ProfileModel.scss';
import { db, store } from '../../../../config/firebase';
import { useAuth } from '../../../../context/AuthContext';



const ProfileModel = ({ setViewProfileModel }) => {
    const { user } = useAuth();
    const [newProfile, setNewProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = () => {
        if (!newProfile) return;

        setLoading(true);

        const storageRef = ref(store, `${ user.uid }/${ new Date().getTime() }__${ newProfile.name }`);
        const uploadTask = uploadBytesResumable(storageRef, newProfile);

        uploadTask.on('state_changed', 
            () => {}, 
            (error) => console.error(error), 
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        updateDoc(doc(db, 'users', user.email.split('@')[0].replaceAll('.', '')), {
                            userProfile: downloadURL
                        });

                        const postsRef = query(collection(db, 'posts'), where('userId', '==', user.uid));
                        getDocs(postsRef)
                            .then((snapshot) => {
                                const batch = writeBatch(db);

                                snapshot.forEach((document) => {
                                    batch.update(doc(db, 'posts', document.data().id), { profile: downloadURL });
                                });

                                return batch;
                            })
                            .then((batch) => {
                                batch.commit();
                                setLoading(false);
                                setViewProfileModel(false);
                            })
                            .catch((err) => console.error(err));
                    });
            }
        );
    };

    return (
        <div className='profile-model-wrapper'>
            <div className='profile-model-content'>
                <span 
                    className='close'
                    onClick={ () => setViewProfileModel(false) }
                >X</span>
                <h3 className='title'>Mettre à jour la photo de profil</h3>

                { newProfile && (
                    <div className='new-profile-container'>
                        <img 
                            src={ URL.createObjectURL(newProfile) } 
                            alt=""
                            loading='lazy'
                            draggable='false'
                        />

                        <div className='new-profile-footer'>
                            <button
                                onClick={ () => setViewProfileModel(false) }
                            >Annuler</button>
                            <button 
                                disabled={ loading }
                                className='save'
                                onClick={ handleUpdateProfile }
                            >{ loading ? 'Enregistrer...' : 'Enregistrer' }</button>
                        </div>
                    </div>
                )}

                { !newProfile && (
                    <div className='new-profile-input'>
                        <input 
                            type="file"
                            onChange={ (e) => setNewProfile(e.target.files[0]) }
                            id='new-profile-input'
                            hidden
                        />
                        <label htmlFor="new-profile-input">
                            + Importer une photo
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileModel;