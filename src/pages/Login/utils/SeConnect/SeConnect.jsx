import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";

import { auth, db } from '../../../../config/firebase';



const SeConnect = ({ userData }) => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                return user;
            })
            .then((user) => {
                setDoc(doc(db, 'users', user.email.split('@')[0]), {
                    userId: user.uid,
                    userName: user.displayName,
                    userEmail: user.email,
                    userProfile: user.photoURL,
                    userLink: user.email.split('@')[0],
                });

                navigate('/');
            })
            .catch((err) => {
                console.error(err);
            })
    };

    return (
        <button 
            type='button'
            onClick={ handleSignIn }
        >
            Se connecter
            <span>(déjà compte)</span>
        </button>
    );
};

export default SeConnect;