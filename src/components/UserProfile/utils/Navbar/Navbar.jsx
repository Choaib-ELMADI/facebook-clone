import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import { BsThreeDots } from 'react-icons/bs';

import images from '../../../../constants/images';
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

const LittleNav = ({ activeLink, setActiveLink, setViewLittleNav }) => {
    return (
        <div className='little-navbar'>
            {
                navbarItems.slice(3, 6).map((item, i) => (
                    <Link 
                        key={ `link-${ i+1 }` }
                        className={ activeLink === item.link ? 'navlink current' : 'navlink' }
                        to={ item.link }
                        onClick={ () => {
                            setActiveLink(item.link);
                            setViewLittleNav(false); 
                        }}
                    >
                        { item.title }
                    </Link>
                ))
            }
        </div>
    );
};



const Navbar = ({ userInfo }) => {
    const [activeLink, setActiveLink] = useState('');
    const [viewLittleNav, setViewLittleNav] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.split('/').length === 3) {
            setActiveLink('');
        } else {
            setActiveLink(location.pathname.split('/')[3]);
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={ scrollTop > 540 ? 'user-profile-page__content__navbar sticky' : 'user-profile-page__content__navbar' }>
            <a 
                className='navlink profile-link'
                href='#'
            >
                <img 
                    src={ userInfo.userProfile ? userInfo.userProfile : images.user_1 } 
                    alt=""
                    loading='lazy'
                    referrerPolicy='no-referrer'
                    draggable='false'
                    width={ 35 }
                    height={ 35 }
                />
                { userInfo.userName ? userInfo.userName : 'Facebook User' }
            </a>
            {
                navbarItems.map((item, i) => (
                    <Link 
                        key={ `link-${ i+1 }` }
                        className={ activeLink === item.link ? `navlink active ${ item.link }` : `navlink ${ item.link }` }
                        to={ item.link }
                        onClick={ () => setViewLittleNav(false) }
                    >
                        { item.title }
                    </Link>
                ))
            }
            <div 
                className={ 
                    (activeLink === 'photos') || (activeLink === 'videos') || (activeLink === 'reels') ?
                    'navlink plus active' : 'navlink plus' 
                }
                onClick={ () => setViewLittleNav(!viewLittleNav) }
            >
                Plus
                <TbTriangleInvertedFilled size={ 10 } />

                { viewLittleNav && (
                    <LittleNav
                        activeLink={ activeLink }
                        setActiveLink={ setActiveLink }
                        setViewLittleNav={ setViewLittleNav }
                    />
                )}
            </div>
            <div className='navlink dots'>
                <BsThreeDots size={ 20 } />
            </div>
        </div>
    );
};

export default Navbar;