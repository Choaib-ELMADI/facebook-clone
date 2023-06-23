import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { auth, googleProvider, db } from '../../../../config/firebase';



const SignInWithGoogle = () => {
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
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
            });
    };

    return (
        <button
            onClick={ signInWithGoogle }
            style={{ background: 'rgba(252, 85, 10, .2)' }}
        >
            <FcGoogle size={ 25 } />
            Se connecter avec Google
        </button>
    );
};

export default SignInWithGoogle;