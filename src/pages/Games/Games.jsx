import { useEffect } from 'react';

import './Games.scss';
import { Navbar, Sidebar } from '../../components/index';
import images from '../../constants/images';



const Games = () => {
  useEffect(() => {
    document.title = 'Games | Facebook';
  }, []);

  return (
    <main className="games">
        <Navbar />
        <div className='section'>
          <Sidebar title='Games' />
          <div className='games-content'>
            <div className='main-game-container'>
              <img 
                src={ images.main_game } 
                alt="" 
                draggable='false'
                loading='lazy'
              />
              <div className='info'>
                <div className='thumbnail'>
                  <img 
                    src={ images.main_game } 
                    alt="" 
                    draggable='false'
                    loading='lazy'
                  />
                </div>
                <div className='title'>
                  <h1>Jeu à la Une</h1>
                  <h3>Le jeu à la une cette semaine</h3>
                </div>
              </div>
            </div>
            <div className='games-container'>
              <div><h3>Game</h3></div>
              <div><h3>Game</h3></div>
              <div><h3>Game</h3></div>
            </div>
          </div>
      </div>
    </main>
  );
};

export default Games;