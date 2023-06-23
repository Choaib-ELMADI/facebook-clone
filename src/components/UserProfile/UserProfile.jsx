import React from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';

import './UserProfile.scss';
import { Navbar } from '../index';
import { db } from '../../config/firebase';
import images from '../../constants/images';



const UserProfile = () => {
    const userInfo = useLoaderData();

    return (
        <>
            { userInfo && (
                <div className='user-profile-page'>
                    <Navbar />
                    <div className='user-profile-page__content'>
                        <h1>{ userInfo.userName ? userInfo.userName : 'User' }</h1>
                        <h2>{ userInfo.userLink }</h2>
                        <h3>{ userInfo.userEmail }</h3>
                        <h4>{ userInfo.userId }</h4>
                        <img 
                            src={ userInfo.userProfile ? userInfo.userProfile : images.user_2 } 
                            alt=""
                            referrerPolicy='no-referrer'
                            loading='lazy'
                            width={ 100 }
                            height={ 100 }
                            draggable='false'
                        />
                    </div>
                </div>
            )}
            { !userInfo && (
                <Navigate to='/404' />
            )}
        </>
    );
};

export default UserProfile;

export const UserProfileLoader = async ({ params }) => {
    const { userLink } = params;

    try {
        const querySnapshot = await getDoc(doc(db, 'users', userLink));
        if (querySnapshot.exists()) {
            return querySnapshot.data();
        }
        return null;
    }
    catch(err) {
        console.error(err);
    }
};