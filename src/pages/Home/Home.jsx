import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import './Home.scss';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';
import Navbar from "../../components/Navbar/Navbar";
import { LeftSidebar, RightSidebar } from "../../components/index";
import { CreatePost, StoriesAndReels, Posts } from "../../container/index";



export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Facebook';
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  const fetchPosts = () => {
    let availablePosts = [];
    getDocs(collection(db, 'posts'))
        .then((data) => {
            data.forEach(doc => {
              availablePosts.push({ id: doc.id, ...doc.data() });
            });
            setPosts(availablePosts);
            setLoading(false);
        })
        .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUserInfo();
  }, [user]);

  const fetchUserInfo = () => {
      const q = query(collection(db, 'users'), where('userId', '==', user.uid));
      getDocs(q)
          .then(data => {
              data.forEach(d => {
                  setUserInfo({ ...d.data() })
              })
          })
          .catch(err => console.error(err));
  };

  return (
    <main className="home">
      <Navbar />
      
      <LeftSidebar userInfo={ userInfo } />
      <div className="home__main-section">
        <div className='home__main-section-content'>
          <StoriesAndReels />
          <CreatePost fetchPosts={ fetchPosts } />
          <Posts 
            loading={ loading } 
            posts={ posts }
          />
        </div>
      </div>
      <RightSidebar />
    </main>
  );
};