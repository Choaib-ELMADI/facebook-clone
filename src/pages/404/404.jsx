import React from 'react';
import { Link } from 'react-router-dom';
import { FcLock } from 'react-icons/fc';

import './404.scss';
import { Navbar } from '../../components/index';



const NotFound = () => {
    return (
        <div className='not-found-wrapper'>
            <Navbar />
            <div className='not-found-wrapper__content'>
                <FcLock size={ 120 } />
                <h2>Ce contenu n'est pas disponible pour le moment</h2>
                <p>
                    Ce problème vient généralement du fait que le 
                    propriétaire ne l'a partagé qu'avec un petit 
                    groupe de personnes, a modifié qui pouvait le voir ou 
                    l'a supprimé.
                </p>
                <Link
                    className='back main'
                    to='/'
                >
                    <h4>Accéder au fil d'actualité</h4>
                </Link>
                <Link
                    className='back'
                    to='/'
                >
                    <h4>Retour</h4>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;