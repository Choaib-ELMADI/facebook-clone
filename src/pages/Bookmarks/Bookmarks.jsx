import { useState, useEffect } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';

import './Bookmarks.scss';
import { LeftSidebar, Navbar } from '../../components/index';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';



const Bookmarks = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({});

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

    useEffect(() => {
        document.title = 'Bookmarks | Facebook';
    }, []);

    return (
        <main className="bookmarks">
            <Navbar />
            <LeftSidebar userInfo={ userInfo } />
        </main>
    );
};

export default Bookmarks;