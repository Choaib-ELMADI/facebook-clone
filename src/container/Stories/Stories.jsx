import React, { useState, useRef } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { CgClapperBoard } from 'react-icons/cg';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi';

import './Stories.scss';
import images from '../../constants/images';
import { useAuth } from '../../context/AuthContext';



const Stories = () => {
    const [activeSection, setActiveSection] = useState('stories');
    const containerRef = useRef(null);
    const { user } = useAuth();

    const handleScroll = (direction) => {
        const container = containerRef.current;
        container.scrollLeft += direction * 140 * 2;
    };    

    return (
        <div className='stories-wrapper'>
            <header>
                <button
                    className={ activeSection === 'stories' ? 'active' : '' }
                    onClick={ () => setActiveSection('stories') }
                >
                    <FaBookOpen size={ 25 } />
                    <span>Stories</span>
                </button>
                <button
                    className={ activeSection === 'reels' ? 'active' : '' }
                    onClick={ () => setActiveSection('reels') }
                >
                    <CgClapperBoard size={ 25 } />
                    <span>Reels</span>
                </button>
            </header>
            <div 
                className='stories-reels-container'
                ref={ containerRef }
            >
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
                <div className='story'></div>
                <div className='story'></div>
                <div className='story'></div>
                <div className='story'></div>
                <div className='story'></div>
                <div className='story'></div>
                <div className='story'></div>

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
        </div>
    );
};

export default Stories;