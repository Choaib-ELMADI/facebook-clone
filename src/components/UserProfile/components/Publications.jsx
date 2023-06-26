import React from 'react';
import { useOutletContext } from 'react-router-dom';

import './Publications.scss';
import { Card, Filter, Posts, UserPhotos } from '../utils/index';
import { useAuth } from '../../../context/AuthContext';
import { CreatePost } from '../../../container/index';



const Publications = () => {
  const { user } = useAuth();
  const [userInfo, setViewModel, userPosts, loading] = useOutletContext();

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
          <Filter setViewModel={ setViewModel } />
          <Posts 
            userPosts={ userPosts } 
            loading={ loading } 
          />
        </div>
      </div>
  );
};

export default Publications;