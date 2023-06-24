import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import { BsThreeDots } from 'react-icons/bs';

import './Navbar.scss';
const navbarItems = [
    {
        title: 'Publications',
        link: '',
    },
    {
        title: 'A propos',
        link: 'about',
    },
    {
        title: 'Amis',
        link: 'friends',
    },
    {
        title: 'Photos',
        link: 'photos',
    },
    {
        title: 'Vidéos',
        link: 'videos',
    },
    {
        title: 'Reels',
        link: 'reels',
    },
];



const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.split('/').length === 3) {
            setActiveLink('');
        } else {
            setActiveLink(location.pathname.split('/')[3]);
        }
    }, [location]);

    return (
        <div className='user-profile-page__content__navbar'>
            {
                navbarItems.map((item, i) => (
                    <Link 
                        key={ `link-${ i+1 }` }
                        className={ activeLink === item.link ? 'navlink active' : 'navlink' }
                        to={ item.link }
                    >
                        { item.title }
                    </Link>
                ))
            }
            <div className='navlink plus'>
                Plus
                <TbTriangleInvertedFilled size={ 10 } />
            </div>
            <div className='navlink dots'>
                <BsThreeDots size={ 20 } />
            </div>
        </div>
    );
};

export default Navbar;