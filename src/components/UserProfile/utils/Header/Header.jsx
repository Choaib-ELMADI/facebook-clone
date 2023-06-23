import React from 'react';
import { BsFillPersonCheckFill, BsMessenger } from 'react-icons/bs';

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
                </div>
                <div className='user-data'>
                    <div className='user-name'>
                        <h1>{ userInfo.userName ? userInfo.userName : 'Facebook User' }</h1>
                        <h2>({ userInfo.userLink })</h2>
                    </div>
                    <p>
                        <span>3,2 K amis</span> • <span>12 en commun</span>
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
                    <button>
                        <BsFillPersonCheckFill size={ 20 } />
                        Amis
                    </button>
                    <button className='message'>
                        <BsMessenger size={ 18 } />
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;