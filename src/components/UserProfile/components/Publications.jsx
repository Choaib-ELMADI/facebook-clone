import React from 'react';
import { useOutletContext } from 'react-router-dom';

import './Publications.scss';
import { Card, Filter, Posts } from '../utils/index';



const Publications = () => {
  const userInfo = useOutletContext();

  return (
      <div className='user-profile__publications'>
        <div className='user-profile__publications__left'>
          <Card height={ 200 } title='Intro' />
          <Card height={ 200 } title='Photos' />
          <Card height={ 200 } title='Amis' />
          <Card height={ 200 } title='Évènements marquants' />
        </div>
        <div className='user-profile__publications__right'>
          <Filter />
          <Posts userInfo={ userInfo } />
        </div>
      </div>
  );
};

export default Publications;