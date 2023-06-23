import React from 'react';
import { NavLink } from 'react-router-dom';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import { BsThreeDots } from 'react-icons/bs';

import './Navbar.scss';
const navbarItems = [
    {
        title: 'Publications',
        link: 'publications',
    },
    {
        title: 'A propos',
        link: 'about',
    },
    {
        title: 'Amis',
        link: '#',
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
    return (
        <div className='user-profile-page__content__navbar'>
            {
                navbarItems.map((item, i) => (
                    <NavLink 
                        key={ `link-${ i+1 }` }
                        className='navlink'
                        to={ item.link }
                    >
                        { item.title }
                    </NavLink>
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