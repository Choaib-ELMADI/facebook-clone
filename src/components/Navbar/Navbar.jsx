import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';
import { 
    AiFillHome, AiOutlineHome,
    AiFillVideoCamera, AiOutlineVideoCamera,
    AiFillShop, AiOutlineShop,
} from 'react-icons/ai';
import { MdPeopleAlt, MdPeopleOutline } from 'react-icons/md'
import { IoGameController, IoGameControllerOutline } from 'react-icons/io5';
import { TbGridDots } from 'react-icons/tb';
import { BsMessenger } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';

import './Navbar.scss';
import images from '../../constants/images';
import Searchbar from '../SearchBar/Searchbar';
import { useAuth } from '../../context/AuthContext';
import { Notification, Messenger, Profile, Menu } from '../index';

const links = [
    {
        name: 'home',
        link: '/',
        fill: <AiFillHome size={ 30 } />,
        outline: <AiOutlineHome size={ 30 } />
    },
    {
        name: 'friends',
        link: '/',
        fill: <MdPeopleAlt size={ 30 } />,
        outline: <MdPeopleOutline size={ 30 } />
    },
    {
        name: 'videos',
        link: '/',
        fill: <AiFillVideoCamera size={ 29 } />,
        outline: <AiOutlineVideoCamera size={ 29 } />
    },
    {
        name: 'shop',
        link: '/',
        fill: <AiFillShop size={ 30 } />,
        outline: <AiOutlineShop size={ 30 } />
    },
    {
        name: 'games',
        link: '/',
        fill: <IoGameController size={ 30 } />,
        outline: <IoGameControllerOutline size={ 30 } />
    },
];

const buttons = [
    {
        name: 'menu',
        icon: <TbGridDots size={ 20 } />,
    },
    {
        name: 'messenger',
        icon: <BsMessenger size={ 20 } />,
    },
    {
        name: 'notifications',
        icon: <FaBell size={ 20 } />,
    },
];



const Navbar = () => {
    const [vueSearchList, setVueSearchList] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [clickedButton, setClickedButton] = useState(null);
    const { user } = useAuth();

    const handleChoosedButton = (name) => {
        if (clickedButton === name) {
            setClickedButton(null);
        } else {
            setClickedButton(name);
        }
    };

    return (
        <nav className="navbar">
            <div className='search-section'>
                <Link to='/home' className='logo'>
                    <img 
                        className='image'
                        src={ images.facebook_logo }
                        alt='Facebook'
                    />
                </Link>
                <div 
                    className='search'
                    onClick={ () => setVueSearchList(true) }
                >
                    <GoSearch />
                    <p>Rechercher sur Facebook</p>
                </div>
                { vueSearchList && <Searchbar setVueSearchList={ setVueSearchList } /> }
            </div>
            <div className='main-section'>
                {
                    links.map((link, i) => (
                        <Link 
                            to={ `/home` }
                            key={ `link-${ i }` }
                            href={ link.link } 
                            className={ activeLink === link.name ? 'link active' : 'link' }
                            onClick={ () => setActiveLink(link.name) }
                        >
                            { 
                                activeLink === link.name ?
                                link.fill : 
                                link.outline
                            }
                        </Link>
                    ))
                }
            </div>
            <div className='personal-section'>
                {
                    buttons.map((btn, i) => {
                        return (
                            <div 
                                key={ `button-${ i }` }
                                className={ clickedButton === btn.name ? 'active' : '' }
                                onClick={ () => handleChoosedButton(btn.name) }
                            >
                                { btn.icon }
                            </div>
                        )
                    })
                }
                <div
                    className={ clickedButton === 'profile' ? 'active' : '' }
                    onClick={ () => handleChoosedButton('profile') }
                >
                    <img
                        className='image'
                        width={ 40 }
                        height={ 40 }
                        alt={ user.displayName ? user.displayName : 'user' }
                        src={ user.photoURL ? user.photoURL : images.user_1 }
                    />
                </div>
            </div>
            { clickedButton === 'notifications' && <Notification  /> }
            { clickedButton === 'messenger' && <Messenger /> }
            { clickedButton === 'profile' && <Profile /> }
            { clickedButton === 'menu' && <Menu /> }
        </nav>
    );
};

export default Navbar;