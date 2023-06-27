import React from 'react';

import images from '../../constants/images';
import './RightSidebar.scss';



const RightSidebar = () => {
    return (
        <div className='sidebar right'>
            <div className='right-sidebar-content'>
                <h3 className='title'>Sponsorisé</h3>
                <a 
                    className='my-link'
                    href="https://elmadichoaib.vercel.app"
                    target='_blank'
                    rel='no-referrer'
                >
                    <img 
                        src={ images.choaib } 
                        alt=""
                        loading='lazy'
                        draggable='false'
                    />
                    <div className='info'>
                        <h3>My Portfolio</h3>
                        <p>elmadichoaib.vercel.app</p>
                    </div>
                </a>
                <a 
                    className='my-link'
                    href="https://ard-uno.netlify.app/"
                    target='_blank'
                    rel='no-referrer'
                >
                    <img 
                        src={ images.arduino } 
                        alt=""
                        loading='lazy'
                        draggable='false'
                    />
                    <div className='info'>
                        <h3>Arduino Projects</h3>
                        <p>ard-uno.netlify.app</p>
                    </div>
                </a>
                <a 
                    className='my-link'
                    href="https://get-3d.netlify.app/"
                    target='_blank'
                    rel='no-referrer'
                >
                    <img 
                        src={ images.get_3d } 
                        alt=""
                        loading='lazy'
                        draggable='false'
                    />
                    <div className='info'>
                        <h3>Get 3d</h3>
                        <p>get-3d.netlify.app</p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default RightSidebar;