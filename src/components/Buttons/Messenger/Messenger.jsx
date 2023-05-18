import { BsThreeDots } from 'react-icons/bs';
import { BiCollapse, BiVideoPlus } from 'react-icons/bi';
import { IoIosCreate } from 'react-icons/io';
import { GoSearch } from 'react-icons/go';

import './Messenger.scss';
import images from '../../../constants/images';

const contacts = [
  {
    name: 'Wiliam Deer',
    profile: images.user_1,
    lastMessage: '1 jour',
  },
  {
    name: 'Ali Dahim',
    profile: images.user_2,
    lastMessage: '2 jours',
  },
  {
    name: 'Choaib Elmadi JS',
    profile: images.choaib,
    lastMessage: '4 jours',
  },
  {
    name: 'Lina Foo',
    profile: images.user_3,
    lastMessage: '5 jours',
  },
];



const Messenger = () => {
  return (
    <div className='messenger-container'>
        <div className='header'>
            <h1>Discussions</h1>
            <div className='actions'>
                <div><BsThreeDots size={ 22 } /></div>
                <div><BiCollapse size={ 22 } /></div>
                <div><BiVideoPlus size={ 22 } /></div>
                <div><IoIosCreate size={ 22 } /></div>
            </div>
        </div>
        <div className='messenger-search'>
          <div className='search'>
            <GoSearch />
            <p>Rechercher sur Messenger</p>
          </div>
          <div className='contacts-container'>
            {
              contacts.map((c, i) => (
                <div className='contact' key={ `contact-${ i }` }>
                  <div className='profile'>
                    <img className='image' src={ c.profile } />
                  </div>
                  <div className='info'>
                    <p>{ c.name }</p>
                    <p>{ c.lastMessage }</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  );
};

export default Messenger;