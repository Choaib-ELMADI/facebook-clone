import React from 'react';
import { Outlet } from 'react-router-dom';

import './UserProfileLayout.scss';
import { Navbar } from '../../components/index';
import { Header, ProfileNavbar } from '../../components/UserProfile/utils/index';



const UserProfileLayout = ({ userInfo }) => {
    return (
        <div className='user-profile-page'>
            <Navbar />
            <div className='user-profile-page__content'>
                <Header userInfo={ userInfo } />
                <ProfileNavbar />

                <Outlet />
            </div>
        </div>
    );
};

export default UserProfileLayout;