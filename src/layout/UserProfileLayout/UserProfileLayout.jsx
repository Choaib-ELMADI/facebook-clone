import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getDocs, collection, query, where, and } from 'firebase/firestore';

import './UserProfileLayout.scss';
import { db } from '../../config/firebase';
import { Navbar } from '../../components/index';
import { Header, ProfileNavbar } from '../../components/UserProfile/utils/index';
import FilterModel from '../../components/UserProfile/utils/FilterModel/FilterModel';



const UserProfileLayout = ({ userInfo }) => {
    const [userPosts, setUserPosts] = useState([]);
    const [selectedYear, setSelectedYear] = useState('Année');
    const [loading, setLoading] = useState(true);
    const [viewModel, setViewModel] = useState(false);

    useEffect(() => {
        if (viewModel) {
            setLoading(true);
            document.body.style.overflow = 'hidden';
        } else {
            setLoading(false);
            document.body.style.overflow = 'auto';
        }
    }, [viewModel]);
    
    useEffect(() => {
        filterUserPostsByYear(selectedYear);
    }, []);
    
    const filterUserPostsByYear = (year) => {
    if (year === 'Année') {
        fetchUserPosts();
    } else {
        fetchByYear(year);
    }
    };
    
    const fetchUserPosts = () => {
    const q = query(
        collection(db, "posts"),
        where("userId", "==", userInfo.userId)
    );
    
    let availablePosts = [];
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
    const q = query(
        collection(db, "posts"), 
        and(
        where("userId", "==", userInfo.userId), 
        where("year", "==", year)
        )
    );
    
        let availablePosts = [];
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

    return (
        <div className='user-profile-page'>
            <Navbar />
            <div className='user-profile-page__content'>
                <Header userInfo={ userInfo } />
                <ProfileNavbar userInfo={ userInfo } />

                <div className='user-profile-page__content__actuel'>
                    <Outlet 
                        context={[
                            userInfo,
                            setViewModel,
                            userPosts,
                            loading,
                        ]}
                    />
                </div>
            </div>

            { viewModel && (
                <FilterModel
                    setViewModel={ setViewModel }
                    selectedYear={ selectedYear }
                    setSelectedYear={ setSelectedYear }
                    filterUserPostsByYear={ filterUserPostsByYear }
                />
            )}
        </div>
    );
};

export default UserProfileLayout;