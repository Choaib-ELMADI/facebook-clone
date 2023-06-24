import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';

import { db } from '../../../../config/firebase';
import Post from '../../../../container/Posts/Post';
import { NoPost, PostModel } from '../../../../container/Posts/utils/index';
import './Posts.scss';



const Posts = ({ userInfo }) => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserPosts();
    }, []);
    
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

    const renderContent = () => {
        if (loading) {
            return (
                <PostModel />
            );
        }

        if (userPosts.length === 0) {
            return (
                <NoPost />
            );
        }

        return (
            userPosts.toReversed().map(userPost => (
                <Post 
                    key={ userPost.id } 
                    post={ userPost }
                />
            ))
        );
    };

    return (
        <div className='user-posts-container'>
            { renderContent() }
        </div>
    );
};

export default Posts;