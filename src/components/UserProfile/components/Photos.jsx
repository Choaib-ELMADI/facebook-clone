import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../../../config/firebase';
import './Photos.scss';



const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = useOutletContext();

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
            <>
              <div className='placeholder' />
              <div className='placeholder' />
              <div className='placeholder' />
            </>
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
      <div className='user-profile__photos'>
        <h3>Photos</h3>
        <div className='user-profile__photos-container'>
          { renderContent() }
        </div>
      </div>
  );
};

export default Photos;