'use client';

import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';

import './Notification.scss';



const Notification = () => {
  const [activeFilter, setActiveFilter] = useState('tout');
  const [filteredNotifications, setFilteredNotifications] = useState([]);

  return (
    <div className='notification-container'>
      <div className='header'>
        <h1>Notifications</h1>
        <div>
          <BsThreeDots size={ 26 } />
        </div>
      </div>
      <div className='filter'>
        <button 
          className={ activeFilter === 'tout' ? 'active' : '' }
          onClick={ () => setActiveFilter('tout') }
          >
          Tout
        </button>
        <button
          className={ activeFilter === 'non-lu' ? 'active' : '' }
          onClick={ () => setActiveFilter('non-lu') }
        >
          Non lu
        </button>
      </div>
      <div className='container'>
        {
          filteredNotifications.length < 1 &&
          <div className='no-notif'>
            <FaBell size={ 80 } />
            <h3>
              Vous n'avez aucune notification
            </h3>
          </div>
        }
      </div>
    </div>
  );
};

export default Notification;