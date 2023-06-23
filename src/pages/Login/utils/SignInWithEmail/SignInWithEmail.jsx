import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../../../../config/firebase';



const SignInWithEmail = ({ userData, handleChange }) => {
    const [inputTypeChecked, setInputTypeChecked] = useState(false);
    const navigate = useNavigate();

    const handleSubmitForm = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, userData.email, userData.password)
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
            .catch((err) => console.log(err));
    };

    return (
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
    );
};

export default SignInWithEmail;