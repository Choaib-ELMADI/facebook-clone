import React from 'react';
import { IoSettings } from 'react-icons/io5';
import { BsPlus } from 'react-icons/bs';

import './Sidebar.scss';
import { Link } from 'react-router-dom';



const Sidebar = ({ title }) => {
    return (
        <div className='commun-sidebar'>
            <div className='commun-sidebar__header'>
                <h2>{ title }</h2>
                <span>
                    <IoSettings size={ 24 } />
                </span>
            </div>
            <div className='commun-sidebar__fake-links'>
                {
                    [...Array(5)].map((_, i) => (
                        <div className='fake-link' key={ `link-${ i+1 }` }>
                            <div className='cercle' />
                            <div className='rectangle' />
                        </div>
                    ))
                }
                { title === 'MarketPlace' && (
                    <Link 
                        className='add-item'
                        to='/marketplace/create'
                    >
                        <BsPlus size={ 24 } />
                        Ajouter un article
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Sidebar;