import { useState, useEffect } from 'react';

import './Friends.scss';
import { Navbar, Sidebar } from '../../components/index';

const Friend = ({ user, handleDelete }) => {
  const [sendRequest, setSendRequest] = useState(false);

  return (
    <div className='friend-wrapper'>
      <div className='friend-profile'>
        <img 
          src={ user.picture.large } 
          alt=""
          draggable='false'
          loading='lazy'
        />
      </div>
      <p className='friend-username'>{ user.name.first } { user.name.last }</p>
      <button 
        className='add'
        onClick={ () => setSendRequest(true) }
        style={{ display: sendRequest ? 'none' : '' }}
      >
        Ajouter comme ami(e)
      </button>
      <button 
        className='close'
        onClick={ () => {
          if (sendRequest) {
            setSendRequest(false);
          } else {
            handleDelete(user.email);
          }
        }}
      >{ sendRequest ? 'Annuler' : 'Supprimer' }</button>
    </div>
  );
};



const Friends = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = 'Friends | Facebook';
  }, []);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        console.error('Error fetching user profiles:', error);
      }
    };

    fetchUserProfiles();
  }, []);

  const handleDelete = (email) => {
    setUsers(
      users.filter(
        user => user.email !== email
      )
    );
  };

  return (
    <main className="friends">
      <Navbar />
      <div className='section'>
          <Sidebar title='Amis' />
          <div className='friends-content'>
          {
            users.length < 1 ?
            <>
              <div className='friend-model'>
                <div className='profile'>No users</div>
                <div className='username' />
                <div className='btn add' />
                <div className='btn close' />
              </div> 
              <div className='friend-model'>
                <div className='profile'>No users</div>
                <div className='username' />
                <div className='btn add' />
                <div className='btn close' />
              </div>
            </>
            :
            users.map((user, i) => (
              <Friend 
                key={ `frined-${ i+1 }` } 
                user={ user } 
                handleDelete={ handleDelete }
              />
            ))
          }
          </div>
      </div>
    </main>
  );
};

export default Friends;