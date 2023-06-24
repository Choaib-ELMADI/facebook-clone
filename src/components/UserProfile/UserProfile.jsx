import React from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';

import { db } from '../../config/firebase';
import { UserProfileLayout } from '../../layout/index';



const UserProfile = () => {
    const userInfo = useLoaderData();

    return (
        <>
            { userInfo && (
                <UserProfileLayout userInfo={ userInfo } />
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