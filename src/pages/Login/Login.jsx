import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";

import { auth, googleProvider, db } from '../../config/firebase';
import './Login.scss';



export default function Login() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [inputTypeChecked, setInputTypeChecked] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                return user;
            })
            .then((user) => {
                setDoc(doc(db, 'users', user.uid), {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                });

                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                return user;
            })
            .then((user) => {
                setDoc(doc(db, 'users', user.uid), {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                });

                navigate('/');
            })
            .catch((err) => {
                console.error(err);
            })
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((userCredentials) => {
                const user = userCredentials.user;
                return user;
            })
            .then((user) => {
                setDoc(doc(db, "users", user.uid), {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                });

                navigate('/');
            })
            .catch((err) => {
                console.error(err);
            });
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
                <form onSubmit={ handleSubmitForm }>
                    <input 
                        name='email'
                        type='email' 
                        placeholder='Email' 
                        onChange={ handleChange }
                        required 
                    />
                    <div style={{ position: 'relative' }}>
                        <input 
                            name='password'
                            type= { inputTypeChecked ? 'text' : 'password' } 
                            placeholder='Password' 
                            onChange={ handleChange }
                            required 
                        />
                        <span 
                            className='switch-input-type'
                            style={{
                                display: userData.password === '' ? 'none' : 'grid',
                            }}
                            onClick={ () => setInputTypeChecked(s => !s) }
                        >
                            { 
                                !inputTypeChecked ? 
                                <AiOutlineEye size={ 18 } /> : 
                                <AiOutlineEyeInvisible size={ 18 } /> 
                            }
                        </span>
                    </div>
                    <button type='submit'>Créer compte</button>
                </form>

                <div className='line' />

                <button 
                    type='button'
                    onClick={ handleSignIn }
                >
                    Se connecter
                    <span>(déjà compte)</span>
                </button>

                <button
                    onClick={ signInWithGoogle }
                    style={{ background: 'rgba(252, 85, 10, .2)' }}
                >
                    <FcGoogle size={ 25 } />
                    Se connecter avec Google
                </button>
            </div>
        </div>
    );
};