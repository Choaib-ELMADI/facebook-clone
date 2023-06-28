import { useState } from 'react';
import { BiCollapse } from 'react-icons/bi';
import { GoSearch } from 'react-icons/go';

import './Messenger.scss';
import { MessengerSearchbar } from '../../index';



const Messenger = ({ setClickedButton }) => {
  const [vueSearchList, setVueSearchList] = useState(false);

  return (
    <div className='messenger-container'>
        <div className='header'>
            <h1>Discussions</h1>
            <div className='actions'>
                <div 
                  onClick={ () => setClickedButton(null) }
                >
                  <BiCollapse size={ 22 } />
                </div>
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
            setClickedButton={ setClickedButton }
          /> 
        )}
    </div>
  );
};

export default Messenger;