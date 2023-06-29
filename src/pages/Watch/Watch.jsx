import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import './Watch.scss';
import { Navbar, Sidebar } from '../../components/index';
import images from '../../constants/images';

const Video = () => {
  const [hidePost, setHidePost] = useState(false);

  return (
    <div className='video-wrapper'>
      { !hidePost && (
        <> 
          <div className='header'>
            <div className='profile'>
              <img 
                src={ images.user_2 } 
                alt="" 
                draggable='false'
                referrerPolicy='no-referrer'
                loading='lazy'
              />
            </div>
            <div className='user-info'>
              <Link to='/' className='user-name'>Sabear lives</Link>
              <p className='time'>Hier, a 13:25</p>
            </div>
            <div className='hide'
              onClick={ () => setHidePost(true) }
            >
              <IoClose size='26' />
            </div>
          </div>
          <div className='body'>
            <img 
              src={ images.user_3 } 
              alt="" 
              loading='lazy'
              referrerPolicy='no-referrer'
              draggable='false'
            />
          </div>
        </>
      )}

      { hidePost && (
        <div className='post-hided'>
            <span>X</span>
            <div className='mask'>
                <p>Publication masquée</p>
                <p>Masquer des publications aide Facebook à personnaliser votre Fil.</p>
            </div>
            <button
              onClick={ () => setHidePost(false) }
            >Annuler</button>
        </div>
      )}
    </div>
  );
} ;



const Watch = () => {
  useEffect(() => {
    document.title = 'Watch | Facebook';
  }, []);

  return (
    <main className="watch">
      <Navbar />
      <div className='section'>
          <Sidebar title='Watch' />
          <div className='watch-content'>
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
          </div>
      </div>
    </main>
  );
};

export default Watch;