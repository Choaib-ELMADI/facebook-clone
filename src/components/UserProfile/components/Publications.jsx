import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useOutletContext } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';

import './Publications.scss';
import { db } from '../../../config/firebase';
import { Card, Filter, Posts, UserPhotos } from '../utils/index';
import { useAuth } from '../../../context/AuthContext';
import { CreatePost } from '../../../container/index';



const Publications = () => {
  const { user } = useAuth();
  const userInfo = useOutletContext();
  const [userPosts, setUserPosts] = useState([]);
  const [selectedYear, setSelectedYear] = useState('Année');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    filterUserPostsByYear(selectedYear);
  }, [selectedYear]);

  const fetchUserPosts = () => {
      let availablePosts = [];

      const q = query(collection(db, "posts"), where("userId", "==", userInfo.userId));
      getDocs(q)
          .then((data) => {
              data.forEach((doc) => {
                  availablePosts.push({ ...doc.data() });
              })
              setUserPosts(availablePosts);
              setLoading(false);
          })
          .catch((err) => console.error(err));
  };

  const fetchByYear = (year) => {
    fetchUserPosts();

    const postsByYear = userPosts
      .filter(post => {
        (moment(0).add(post.time, 'milliseconds').year()) < year;
      });

    console.log(postsByYear);
      
    // setUserPosts(postsByYear);
  };

  const filterUserPostsByYear = (year) => {
    if (year === 'Année') {
      fetchUserPosts();
    } else {
      fetchByYear(year);
    }
  };

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
          <Filter 
            filterUserPostsByYear={ filterUserPostsByYear }
            selectedYear={ selectedYear }
            setSelectedYear={ setSelectedYear }
          />
          <Posts 
            userPosts={ userPosts } 
            loading={ loading } 
          />
        </div>
      </div>
  );
};

export default Publications;