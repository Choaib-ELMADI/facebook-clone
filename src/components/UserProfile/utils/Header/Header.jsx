import React from 'react';
import { BsFillPersonCheckFill, BsMessenger, BsPlus, BsPencilFill } from 'react-icons/bs';
import { IoCamera } from 'react-icons/io5';

import { useAuth } from '../../../../context/AuthContext';
import './Header.scss';
import images from '../../../../constants/images';
const friendsPlaceholder = [
    images.user_1, 
    images.user_2, 
    images.user_3,
    images.user_1, 
    images.user_2, 
    images.user_3,
];



const Header = ({ userInfo }) => {
    const { user } = useAuth();

    return (
        <div className='user-profile-page__content__header'>
            <img 
                className='profile-banner'
                src={ images.banner } 
                alt=""
                loading='lazy'
                draggable='false'
            />

            <div className='header-info'>
                <div className='user-profile'>
                    <img
                        src={ userInfo.userProfile ? userInfo.userProfile : images.user_1 } 
                        alt=""
                        loading='lazy'
                        draggable='false'
                        referrerPolicy='no-referrer'
                    />
                    { userInfo.userId === user.uid && (
                        <button className='update-profile'>
                            <IoCamera size={ 26 } />
                        </button>
                    )}
                </div>
                <div className='user-data'>
                    <div className='user-name'>
                        <h1>{ userInfo.userName ? userInfo.userName : 'Facebook User' }</h1>
                        <h2>({ userInfo.userLink })</h2>
                    </div>
                    <p>
                        <span>65 amis</span> • <span>4 en commun</span>
                    </p>
                    <div className='friends-placeholder'>
                        {
                            friendsPlaceholder.map((f, i) => (
                                <div 
                                    className='friend' 
                                    key={`friend-${ i+1 }`}
                                    style={{ 
                                        transform: `translateX(-${ i * 6 }px)`,
                                        zIndex: friendsPlaceholder.length - i,
                                    }}
                                >
                                    <img src={ f } alt="" draggable='false' />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='action-btns'>
                    { userInfo.userId === user.uid && (
                        <>
                            <button className='add'>
                                <BsPlus size={ 20 } />
                                Ajouter à la story
                            </button>
                            <button className='change-profile'>
                                <BsPencilFill size={ 16 } />
                                Modifier le profil
                            </button>
                        </>
                    )}
                    { userInfo.userId !== user.uid && (
                        <>
                            <button>
                                <BsFillPersonCheckFill size={ 20 } />
                                Amis
                            </button>
                            <button className='message'>
                                <BsMessenger size={ 18 } />
                                Message
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;