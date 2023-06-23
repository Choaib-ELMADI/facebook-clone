import React from 'react';
import { useParams } from 'react-router-dom';

import './UserProfile.scss';
import { Navbar } from '../index';



const UserProfile = () => {
    const { userName } = useParams();

    return (
        <div className='user-profile-page'>
            <Navbar />
            <div className='user-profile-page__content'>
                <h1>{ userName }</h1>
            </div>
        </div>
    );
};

export default UserProfile;