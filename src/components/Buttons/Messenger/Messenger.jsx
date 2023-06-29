import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { query, collection, or, getDocs, where } from 'firebase/firestore';
import { GoSearch } from 'react-icons/go';
import { BiCollapse } from 'react-icons/bi';

import './Messenger.scss';
import { db } from '../../../config/firebase';
import { MessengerSearchbar } from '../../index';



const Messenger = () => {
  const [vueSearchList, setVueSearchList] = useState(false);
  const location = useLocation();
  const [recentChats, setRecentChats] = useState([]);

  useEffect(() => {
      fetchChats();
  }, []);

  const fetchChats = () => {
      let myRecentChats = [];

      const q = query(
          collection(db, 'chats'),
          or(
              where('senderLink', '==', location.pathname.split('/')[2]),
              where('receiverLink', '==', location.pathname.split('/')[2]),
          )
      );

      getDocs(q)
          .then((data) => {
              data.docs.forEach((doc => {
                  if (doc.data().messages.length) {
                    myRecentChats.push({ ...doc.data() })
                  }
              }));
              setRecentChats(myRecentChats);
          })
          .catch((err) => console.error(err));
  };

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

        {
          recentChats.length < 1 ?
          <div className='no-recent-chats'>
            <h3>No recent chats</h3>
          </div>
          :
          <div className='recent-chats-container'>
            <h3>Recent chats</h3>
            {
              recentChats.map((recentChat, i) => (
                  <Link
                    key={ `recent-${ i+1 }` }
                    className='link'
                    to={ 
                      `/messages/${ location.pathname.split('/')[2] }/${ location.pathname.split('/')[2] === recentChat.senderLink ? recentChat.receiverLink : recentChat.senderLink }`
                    }
                  >
                    { location.pathname.split('/')[2] === recentChat.senderLink ? recentChat.receiverLink : recentChat.senderLink }
                  </Link>
              ))
            }
          </div>
        }
    </div>
  );
};

export default Messenger;