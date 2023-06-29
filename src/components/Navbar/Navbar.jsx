import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
import { RxHamburgerMenu } from 'react-icons/rx';

import './Navbar.scss';
import images from '../../constants/images';
import Searchbar from '../SearchBar/Searchbar';
import { useAuth } from '../../context/AuthContext';
import { Notification, Profile, Menu } from '../index';
import { db } from '../../config/firebase';

const links = [
    {
        name: 'home',
        link: '',
        fill: <AiFillHome size={ 30 } />,
        outline: <AiOutlineHome size={ 30 } />
    },
    {
        name: 'friends',
        link: 'friends',
        fill: <MdPeopleAlt size={ 30 } />,
        outline: <MdPeopleOutline size={ 30 } />
    },
    {
        name: 'videos',
        link: 'watch',
        fill: <AiFillVideoCamera size={ 29 } />,
        outline: <AiOutlineVideoCamera size={ 29 } />
    },
    {
        name: 'shop',
        link: 'marketplace',
        fill: <AiFillShop size={ 30 } />,
        outline: <AiOutlineShop size={ 30 } />
    },
    {
        name: 'games',
        link: 'games',
        fill: <IoGameController size={ 30 } />,
        outline: <IoGameControllerOutline size={ 30 } />
    },
    {
        name: 'bookmarks',
        link: 'bookmarks',
        fill: <RxHamburgerMenu size={ 30 } />,
        outline: <RxHamburgerMenu size={ 30 } />
    },
];

const buttons = [
    {
        name: 'menu',
        icon: <TbGridDots size={ 20 } />,
    },
    {
        name: 'notifications',
        icon: <FaBell size={ 20 } />,
    },
];



const Navbar = () => {
    const [vueSearchList, setVueSearchList] = useState(false);
    const [clickedButton, setClickedButton] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const { user } = useAuth();
    const location = useLocation();

    const handleChoosedButton = (name) => {
        if (clickedButton === name) {
            setClickedButton(null);
        } else {
            setClickedButton(name);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [user]);
    
    const fetchUserInfo = () => {
        const q = query(collection(db, 'users'), where('userId', '==', user.uid));
        getDocs(q)
            .then(data => {
                data.forEach(d => {
                    setUserInfo({ ...d.data() })
                })
            })
            .catch(err => console.error(err));
    };

    return (
        <nav className="navbar">
            <div className='search-section'>
                <Link to='/' className='logo'>
                    <img 
                        className='image'
                        src={ images.facebook_logo }
                        alt='Facebook'
                        draggable='false'
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
                        <NavLink 
                            to={ `/${ link.link }` }
                            key={ `link-${ i }` }
                            href={ link.link } 
                            className={ `link ${ link.name }` }
                        >
                            {
                                location.pathname.split('/')[1] === link.link ?
                                link.fill :
                                link.outline
                            }
                        </NavLink>
                    ))
                }
            </div>

            <div className='personal-section'>
                <Link
                    to={ `/messages/${ userInfo.userLink }` }
                    className='link'
                >
                    <BsMessenger size={ 20 } />
                </Link>
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
                        src={ userInfo.userProfile ? userInfo.userProfile : images.user_1 } 
                        alt=''
                        loading='lazy'
                        referrerPolicy='no-referrer'
                        style={{ background: 'var(--gray_color)' }}
                        width={ 40 }
                        height={ 40 }
                        draggable='false'
                    />
                </div>
            </div>

            { clickedButton === 'notifications' && <Notification  /> }
            { clickedButton === 'profile' && <Profile userInfo={ userInfo } /> }
            { clickedButton === 'menu' && <Menu /> }
        </nav>
    );
};

export default Navbar;