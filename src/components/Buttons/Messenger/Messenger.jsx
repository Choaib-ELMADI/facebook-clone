import { useState } from 'react';
import { BiCollapse } from 'react-icons/bi';
import { GoSearch } from 'react-icons/go';

import './Messenger.scss';
import { MessengerSearchbar } from '../../index';
import { Link } from 'react-router-dom';



const Messenger = () => {
  const [vueSearchList, setVueSearchList] = useState(false);

  return (
    <div className='messenger-container'>
        <div className='header'>
            <h2>Discussions</h2>
            <div className='actions'>
                <Link
                  to='/'
                  className='link'
                >
                  <BiCollapse size={ 22 } />
                </Link>
            </div>
        </div>

        { !vueSearchList && (
          <div 
            className='search'
            onClick={ () => setVueSearchList(true) }
          > 
            <GoSearch />
            <p>Rechercher sur Messenger</p>
          </div>
        )}

        { vueSearchList && (
          <MessengerSearchbar
            setVueSearchList={ setVueSearchList }
          /> 
        )}
    </div>
  );
};

export default Messenger;