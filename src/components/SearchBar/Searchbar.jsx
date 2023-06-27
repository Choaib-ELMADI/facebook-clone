import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { BiArrowBack } from 'react-icons/bi';

import './Searchbar.scss';
import { db } from '../../config/firebase';
import images from '../../constants/images';



const Searchbar = ({ setVueSearchList }) => {
    const [search, setSearch] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [search]);    

    const fetchUsers = () => {
        let availableUsers = [];

        getDocs(collection(db, 'users'))
            .then((data) => {
                data.forEach(document => {
                    availableUsers.push({ ...document.data() })
                });
                setUsers(availableUsers);
            })
            .catch(err => console.error(err));
    };

    const filterUsers = () => {
        if (search === '') {
            setSearchedUsers([]);
        } else {
            setSearchedUsers(
                users.filter(
                    user => user.userLink.startsWith(search.toLowerCase())
                )
            );
        }
    };

    return (
        <div className='search-list'>
            <div className='header'>
                <BiArrowBack 
                    className='back-arrow'
                    size={ 30 }
                    onClick={ () => setVueSearchList(false) }
                />
                <input
                    type='text'
                    placeholder='Rechercher sur Facebook'
                    onChange={ (e) => setSearch(e.target.value) }
                    value={ search }
                    autoFocus
                />
            </div>
            <div className='list'>
                {
                    searchedUsers.length < 1 ?
                    <p className='no-users'>
                        Aucune recherche récente
                    </p> :
                    <>
                        {
                            searchedUsers.map((user, i) => (
                                <Link 
                                    to={ `/users/${ user.userLink }` } 
                                    key={ `user-${ i }` }
                                    className='user-link'
                                    onClick={ () => setVueSearchList(false) }
                                >
                                    <div className='user-profile'>
                                        <img 
                                            src={ user.userProfile ? user.userProfile : images.user_1 } 
                                            alt="" 
                                            referrerPolicy='no-referrer'
                                            draggable='false'
                                            loading='lazy'
                                        />
                                    </div>
                                    <h4>{ user.userLink }</h4>
                                </Link>
                            ))
                        }
                    </>                             
                }
            </div>
        </div>
    );
};

export default Searchbar;