import React from 'react';
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { BsChevronRight } from 'react-icons/bs';
import { BsFillQuestionCircleFill, BsFillMoonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import './Profile.scss';
import images from '../../../constants/images';
import { auth } from '../../../config/firebase';



const Profile = ({ userInfo }) => {
    const handleUserLogOut = () => {
        signOut(auth)
            .then(() => console.log('Log out successfully'))
            .catch((error) => console.error(error));
    };

    return (
        <div className='profile-container'>
            <div className='profiles'>
                <Link to={ `/users/${ userInfo.userLink }` } className='header'>
                    <img 
                        className='image'
                        src={ userInfo.userProfile ? userInfo.userProfile : images.user_1 } 
                        alt=''
                        loading='lazy'
                        referrerPolicy="no-referrer"
                        style={{ background: 'var(--gray_color)' }}
                        draggable='false'
                    />
                    <p>{ userInfo.userName ? userInfo.userName : 'User' }</p>
                </Link>
                <div className='line' />
                <button>Voir tous les profiles</button>
            </div>
            
            <div className='parameters'>
                <div className='param'>
                    <div className='icon'>
                        <IoSettingsSharp size={ 20 } />
                    </div>
                    <p>Paramètres et confidentialité</p>
                    <BsChevronRight className='chevron' size={ 22 } />
                </div>
                <div className='param'>
                    <div className='icon'>
                        <BsFillQuestionCircleFill size={ 18 } />
                    </div>
                    <p>Aide et assistance</p>
                    <BsChevronRight className='chevron' size={ 22 } />
                </div>
                <div className='param'>
                    <div className='icon'>
                        <BsFillMoonFill size={ 20 } />
                    </div>
                    <p>Affichage et accessibilité</p>
                    <BsChevronRight className='chevron' size={ 22 } />
                </div>
                <div 
                    className='param logout'
                    onClick={ handleUserLogOut }
                >
                    <div className='icon'>
                        <IoLogOut size={ 22 } />
                    </div>
                    <p>Se déconnecter</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;