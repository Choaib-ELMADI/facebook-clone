import { IoIosCreate } from 'react-icons/io';
import { HiBookOpen, HiUserGroup } from 'react-icons/hi';
import { RiVideoAddFill } from 'react-icons/ri';
import { ImFlag } from 'react-icons/im';
import { FaBullhorn, FaNotesMedical } from 'react-icons/fa';
import { BsFillBasket3Fill } from 'react-icons/bs';



const Right = () => {
    return (
        <div className="right-container">
            <h3>Créer</h3>
            <ul>
                <li>
                    <div className='icon'>
                        <IoIosCreate size={ 22 } />
                    </div>
                    Publication
                </li>
                <li>
                    <div className='icon'>
                        <HiBookOpen size={ 22 } />
                    </div>
                    Story
                </li>
                <li>
                    <div className='icon'>
                        <RiVideoAddFill size={ 22 } />
                    </div>
                    Salon
                </li>
            </ul>
            <div className='line' />
            <ul>
                <li>
                    <div className='icon'>
                        <ImFlag size={ 22 } />
                    </div>
                    Page
                </li>
                <li>
                    <div className='icon'>
                        <FaBullhorn size={ 22 } />
                    </div>
                    Publicité
                </li>
                <li>
                    <div className='icon'>
                        <HiUserGroup size={ 22 } />
                    </div>
                    Groupe
                </li>
                <li>
                    <div className='icon'>
                        <FaNotesMedical size={ 22 } />
                    </div>
                    Evènement
                </li>
                <li>
                    <div className='icon'>
                        <BsFillBasket3Fill size={ 22 } />
                    </div>
                    Petite annonce Marketplace
                </li>
            </ul>
        </div>
    );
  };
  
  export default Right;