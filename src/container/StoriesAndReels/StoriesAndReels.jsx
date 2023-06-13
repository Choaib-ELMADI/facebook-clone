import React, { useState, useRef } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { CgClapperBoard } from 'react-icons/cg';
import { BsChevronLeft, BsChevronRight, BsArrowRight } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import './StoriesAndReels.scss';
import images from '../../constants/images';
import { useAuth } from '../../context/AuthContext';
import StoryOrReel from './StoryOrReel';

const storiesAndReels = [
    {
        type: 'stories',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Mohammed Elmadi',
        link: '#'
    },
    {
        type: 'stories',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Hassan Elmadi',
        link: '#'
    },
    {
        type: 'stories',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Soufiane Elmadi',
        link: '#'
    },
    {
        type: 'stories',
        cover: images.user_3,
        userProfile: images.user_3,
        userName: 'Kaoutar Elmadi',
        link: '#'
    },
    {
        type: 'stories',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Salah Elmadi',
        link: '#'
    },
    {
        type: 'stories',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Elkadi Omar',
        link: '#'
    },
    {
        type: 'stories',
        cover: images.user_3,
        userProfile: images.user_3,
        userName: 'Safae hadart',
        link: '#'
    },

    {
        type: 'reels',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Mohammed Elmadi',
        link: '#',
        views: '100 K'
    },
    {
        type: 'reels',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Mohammed Elmadi',
        link: '#',
        views: '342 K'
    },
    {
        type: 'reels',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Mohammed Elmadi',
        link: '#',
        views: '1 M'
    },
    {
        type: 'reels',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Mohammed Elmadi',
        link: '#',
        views: '5, 452'
    },
    {
        type: 'reels',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Mohammed Elmadi',
        link: '#',
        views: '60 K'
    },
    {
        type: 'reels',
        cover: images.user_2,
        userProfile: images.user_1,
        userName: 'Mohammed Elmadi',
        link: '#',
        views: '12 K'
    },
];



const StoriesAndReels = () => {
    const [activeSection, setActiveSection] = useState('stories');
    const [selectedSection, setSelectedSection] = useState(
        storiesAndReels.filter(item => item.type === 'stories')
    );
    const containerRef = useRef(null);
    const { user } = useAuth();

    const handleScroll = (direction) => {
        const { current } = containerRef;
        current.scrollLeft += direction * 140 *3;
        
        console.log(containerRef);
    };

    
    const handleSelection = (type) => {
        setActiveSection(type);
        setSelectedSection(
            storiesAndReels.filter(
                item => item.type === type
            )
        );
    };

    return (
        <div className='stories-wrapper'>
            <header>
                <button
                    className={ activeSection === 'stories' ? 'active' : '' }
                    onClick={ () => handleSelection('stories') }
                >
                    <FaBookOpen size={ 25 } />
                    <span>Stories</span>
                </button>
                <button
                    className={ activeSection === 'reels' ? 'active' : '' }
                    onClick={ () => handleSelection('reels') }
                >
                    <CgClapperBoard size={ 25 } />
                    <span>Reels</span>
                </button>
            </header>
            <div 
                className='stories-reels-container'
                ref={ containerRef }
            >
                {
                    activeSection === 'stories' &&
                    <div className='story create-story'>
                        <div className='user-create-story'>
                            <img 
                                src={ user && user?.photoURL ? user.photoURL : images.user_1 } 
                                alt={ user && user?.displayName ? user.displayName : 'user profile' }
                            />
                        </div>
                        <p>Créer une story</p>
                        <span><HiPlus size={ 26 } /></span>
                    </div>
                }

                {
                    selectedSection.map((item, index) => (
                        <StoryOrReel key={ `item-${ index }` } props={ item } />
                    ))
                }

                {
                    activeSection === 'reels' &&
                    <Link className='view-all-reels' to='/watch'>
                        <span><BsArrowRight size={ 28 } /></span>
                        <p>Voir plus de reels</p>
                    </Link>
                }
            </div>

            <button 
                className='left' 
                onClick={ () => handleScroll(-1) }
            >
                <BsChevronLeft size={ 24 } />
            </button>
            <button 
                className='right' 
                onClick={ () => handleScroll(1) }
            >
                <BsChevronRight size={ 24 } />
            </button>
        </div>
    );
};

export default StoriesAndReels;