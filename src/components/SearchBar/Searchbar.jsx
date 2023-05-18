import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';

import './Searchbar.scss';



const Searchbar = ({ setVueSearchList }) => {
    const [searchedUsers, setSearchedUsers] = useState([]);

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
                    autoFocus 
                    onBlur={ () => setVueSearchList(false) }
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
                            searchedUsers.map((user, i) => {
                                <a href='/' key={ i }>
                                    <h1>user</h1>
                                </a>
                            })
                        }
                    </>                             
                }
            </div>
        </div>
    );
};

export default Searchbar;