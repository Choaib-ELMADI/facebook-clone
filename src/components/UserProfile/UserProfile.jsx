import React from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';

import './UserProfile.scss';
import { Navbar } from '../index';
import { db } from '../../config/firebase';
import { Header, ProfileNavbar } from './utils/index';



const UserProfile = () => {
    const userInfo = useLoaderData();

    return (
        <>
            { userInfo && (
                <div className='user-profile-page'>
                    <Navbar />
                    <div className='user-profile-page__content'>
                        <Header userInfo={ userInfo } />
                        <ProfileNavbar />
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