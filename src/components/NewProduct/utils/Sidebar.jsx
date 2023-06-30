import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import './Sidebar.scss';
import images from '../../../constants/images';
import { useAuth } from '../../../context/AuthContext';
import { UploadPhoto, FormInputs } from './index';



const Sidebar = ({ photo, setPhoto, formData, setFormData, setHovered }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className='new-product-sidebar'>
            <header>
                <div className='links'>
                    <div 
                        className='link'
                        onClick={ () => navigate(-1) }
                    >
                        <IoClose size={ 26 } />
                    </div>
                    <Link 
                        className='link'
                        to='/'
                    >
                        <img
                            src={ images.facebook_logo }
                            alt='Facebook'
                            draggable='false'
                            loading='lazy'
                        />
                    </Link>
                </div>
                <h3>Annonce sur Marketplace</h3>
            </header>
            <div className='body'>
                <div className='user'>
                    <img 
                        src={ user.photoURL ? user.photoURL : images.user_1 } 
                        alt="" 
                        draggable='false'
                        loading='lazy'
                        referrerPolicy='no-referrer'
                    />
                    <p>{ user.displayName ? user.displayName : 'User' }</p>
                </div>
                <UploadPhoto 
                    photo={ photo }
                    setPhoto={ setPhoto }
                    setFormData={ setFormData }
                    setHovered={ setHovered }
                />
                <FormInputs 
                    formData={ formData }
                    setFormData={ setFormData } 
                    setHovered={ setHovered }
                />
            </div>
        </div>
    );
};

export default Sidebar;