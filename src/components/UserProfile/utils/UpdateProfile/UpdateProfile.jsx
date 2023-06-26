import React from 'react';

import './UpdateProfile.scss';
import images from '../../../../constants/images';



const UpdateProfile = ({ setShowUpdateProfileModel, userInfo }) => {
    return (
        <div className='update-profile__wrapper'>
            <div className='update-profile__container'>
                <span 
                    className='close'
                    onClick={ () => setShowUpdateProfileModel(false) }
                >X</span>
                <h3 className='title'>Modifier le profil</h3>
                <div className='content profile'>
                    <header>
                        <h3>Photo de Profil</h3>
                        <button>Modifier</button>
                    </header>
                    <div className='image-container'>
                        <img 
                            src={ userInfo.userProfile ? userInfo.userProfile : images.user_1 }
                            alt=""
                            draggable='false'
                            referrerPolicy='no-referrer'
                        />
                    </div>
                </div>
                <div className='content cover'>
                    <header>
                        <h3>Photo de Couverture</h3>
                        <button>Modifier</button>
                    </header>
                    <div className='image-container'>
                        <img 
                            src={ userInfo.userBanner ? userInfo.userBanner : images.banner }
                            alt=""
                            draggable='false'
                            referrerPolicy='no-referrer'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;