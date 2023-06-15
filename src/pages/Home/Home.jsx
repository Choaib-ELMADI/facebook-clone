import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../../config/firebase';
import './Home.scss';
import Navbar from "../../components/Navbar/Navbar";
import { LeftSidebar, RightSidebar } from "../../components/index";
import { CreatePost, StoriesAndReels, Posts } from "../../container/index";



export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchPosts();
  }, []);

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

  return (
    <main className="home">
      <Navbar />
      
      <LeftSidebar />
      <div className="home__main-section">
        <div className='home__main-section-content'>
          <StoriesAndReels />
          <CreatePost fetchPosts={ fetchPosts } />
          <Posts 
            loading={ loading } 
            posts={ posts } 
            fetchPosts={ fetchPosts }
          />
        </div>
      </div>
      <RightSidebar />
    </main>
  );
};