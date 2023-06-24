import React from 'react';
import { useOutletContext } from 'react-router-dom';

import { Card, Filter, Posts, UserPhotos } from '../utils/index';
import './Publications.scss';
import { useAuth } from '../../../context/AuthContext';
import { CreatePost } from '../../../container/index';



const Publications = () => {
  const { user } = useAuth();
  const userInfo = useOutletContext();

  return (
      <div className='user-profile__publications'>
        <div className='user-profile__publications__left'>
          <Card       height={ 200 }        title='Intro' />
          <UserPhotos userInfo={ userInfo } />
          <Card       height={ 200 }        title='Amis' />
          <Card       height={ 200 }        title='Évènements marquants' />
        </div>
        <div className='user-profile__publications__right'>
          { userInfo.userId === user.uid && (
            <CreatePost />
          )}
          <Filter />
          <Posts userInfo={ userInfo } />
        </div>
      </div>
  );
};

export default Publications;