import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../../../../config/firebase';
import './Photos.scss';



const Photos = ({ userInfo }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserPhotos();
    }, []);

    const fetchUserPhotos = () => {
        let userPhotos = [];

        const q = query(collection(db, 'posts'), where('userId', '==', userInfo.userId));
        getDocs(q)
        .then((data) => {
            data.forEach((d) => {
            if (d.data().hasImage) {
                userPhotos.push(d.data().image);
            }
            })
            setPhotos(userPhotos);
            setLoading(false);
        })
        .catch((err) => console.error(err));
    };

    const renderContent = () => {
        if (loading) {
            return (
                <h3>Loading...</h3>
            );
        }

        if (photos.length === 0) {
            return (
                <h3>No photos</h3>
            );
        }

        return (
            photos.map(photo => (
                <div className='image'>
                    <img
                        src={ photo }
                        alt=''
                        loading='lazy'
                        referrerPolicy='no-referrer'
                        draggable='false'
                    />
                </div>
            ))
        );
    };

    return (
        <div className='user-photos card'>
            <div className='photos-header'>
                <h3>Photos</h3>
                <Link 
                    to={ `/users/${ userInfo.userLink }/photos` }
                    className='photos-link'
                >
                    Toutes les photos
                </Link>
            </div>
            <div className='photos-container'>
                { renderContent() }
            </div>
        </div>
    );
};

export default Photos;