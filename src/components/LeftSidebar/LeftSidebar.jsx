import React from 'react';
import { Link } from 'react-router-dom';
import { FcPuzzle } from 'react-icons/fc';
import { FaCalendarPlus } from 'react-icons/fa';
import { BsFillPeopleFill, BsFillSaveFill, BsFillStarFill, BsFillPlayBtnFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { BiJoystickAlt } from "react-icons/bi";
import { GiGamepadCross, GiBackwardTime } from 'react-icons/gi';

import './LeftSidebar.scss';
import { useAuth } from '../../context/AuthContext';
import images from '../../constants/images';
const links = [
    {
        icon: <BsFillPeopleFill color='#1a7fe9' size={ 24 } />,
        title: 'Amis',
        link: '/'
    },
    {
        icon: <BsFillPlayBtnFill color='#1a7fe9' size={ 24 } />,
        title: 'Watch',
        link: '/'
    },
    {
        icon: <FaCalendarPlus color="#e74a66" size={ 24 } />,
        title: 'Evènements',
        link: '/'
    },
    {
        icon: <HiUserGroup color='#1a7fe9' size={ 24 } />,
        title: 'Groupes',
        link: '/'
    },
    {
        icon: <FaCalendarPlus color='#1a7fe9' size={ 24 } />,
        title: "Fil d'actualité",
        link: '/'
    },
    {
        icon: <BsFillStarFill color='#e9b330' size={ 24 } />,
        title: 'Favoris',
        link: '/'
    },
    {
        icon: <GiGamepadCross color='#1a7fe9' size={ 24 } />,
        title: 'Vidéos de gaming',
        link: '/'
    },
    {
        icon: <BiJoystickAlt color='#1a7fe9' size={ 28 } />,
        title: 'Jouer à des jeux',
        link: '/'
    },
    {
        icon: <GiBackwardTime color='#1a7fe9' size={ 28 } />,
        title: 'Souvenirs',
        link: '/'
    },
    {
        icon: <BsFillSaveFill color='#c139ac' size={ 22 } />,
        title: 'Enregistrements',
        link: '/'
    }
];



const LeftSidebar = () => {
    const { user } = useAuth();

    return (
        <div className='sidebar left'>
            <div className='left-sidebar-content'>
                <Link to='#' className='left-sidebar-content__item'>
                    <img 
                        src={ user && user?.photoURL ? user?.photoURL : images.user_1 } 
                        alt=''
                        loading='lazy'
                        referrerPolicy="no-referrer"
                        style={{ background: 'var(--gray_color)' }}
                        draggable='false'
                    />
                    <p>{ user && user?.displayName ? user?.displayName : 'user profile' }</p>
                </Link>
                {
                    links.map((link) => (
                        <Link key={ link.title } className='left-sidebar-content__item' to={ link.link }>
                            <span>{ link.icon }</span>
                            <p>{ link.title }</p>
                        </Link>
                    ))
                }
                <div className='left-sidebar-content__footer'>
                    <h2>Vos raccourcis</h2>
                    <Link className='left-sidebar-content__item'>
                        <span><FcPuzzle className='icon' /></span>
                        <p>Open The Door - Drawing Puzzle</p>
                    </Link>
                    <div className='cookies-links'>
                        <a href="#">Confidentialité</a>
                        <a href="#">Conditions générales</a>
                        <a href="#">Publicités</a>
                        <a href="#">Choix publicitaires</a>
                        <a href="#">Cookies</a>
                        <p>Meta Clone &copy; 2023</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;