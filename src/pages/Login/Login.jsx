import { useState, useEffect } from 'react';

import './Login.scss';
import SignInWithGoogle from './utils/SignInWithGoogle/SignInWithGoogle';
import SignInWithEmail from './utils/SignInWithEmail/SignInWithEmail';
import SeConnect from './utils/SeConnect/SeConnect';



export default function Login() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        document.title = 'Lodin | Facebook';
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className='login-page'>
            <div className='welcoming'>
                <h1>facebook</h1>
                <p>
                    Avec Facebook, partagez et restez en 
                    contact avec votre entourage.
                </p>
            </div>
            <div className='form-wrapper'>
                <SignInWithEmail
                    userData={ userData }
                    handleChange={ handleChange }
                />
                <div className='line' />
                <SeConnect
                    userData={ userData }
                />
                <SignInWithGoogle />
            </div>
        </div>
    );
};