import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { BiArrowBack } from 'react-icons/bi';

import './MessengerSearchbar.scss';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import images from '../../constants/images';



const MessengerSearchbar = ({ setVueSearchList, setClickedButton }) => {
    const [search, setSearch] = useState('');
    const { user } = useAuth();
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
                    placeholder='Rechercher sur Messenger'
                    onChange={ (e) => setSearch(e.target.value) }
                    value={ search }
                    autoFocus
                />
            </div>
            <div className='list'>
                {
                    searchedUsers.length < 1 ?
                    <p className='no-users'>
                        Tapez l'utilisateur à messager
                    </p> :
                    <>
                        {
                            searchedUsers
                                .map((searchUser, i) => {
                                    if (searchUser.userLink === user.email.split('@')[0]) return;
                                    
                                    return (
                                        <Link 
                                            to={ `/messages/${ searchUser.userLink }` } 
                                            key={ `user-${ i }` }
                                            className='messaging-user-link'
                                            onClick={ () => {
                                                setVueSearchList(false);
                                                setClickedButton(null);
                                            }}
                                        >
                                            <div className='user-profile'>
                                                <img 
                                                    src={ searchUser.userProfile ? searchUser.userProfile : images.user_1 } 
                                                    alt="" 
                                                    referrerPolicy='no-referrer'
                                                    draggable='false'
                                                    loading='lazy'
                                                />
                                            </div>
                                            <h4>{ searchUser.userLink }</h4>
                                        </Link>
                                    )
                                })
                        }
                    </>                             
                }
            </div>
        </div>
    );
};

export default MessengerSearchbar;