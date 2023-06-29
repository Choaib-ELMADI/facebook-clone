import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Marketplace.scss';
import { Navbar, Sidebar } from '../../components/index';
import images from '../../constants/images';

const Produit = () => {
  return (
    <Link 
      className='product-container'
      to='/'
    >
      <img 
        src={ images.user_2 }
        alt=''
        loading='lazy'
        draggable='false'
        referrerPolicy='no-referrer'
      />
      <div className='product-details'>
        <p className='price'>150 Dhs</p>
        <p className='description'>sdksdjjqsl klsdfjjj sdcgcghq mqsdc</p>
        <p className='place'>Marrakech, Morocco</p>
      </div>
    </Link>
  );
};




const Marketplace = () => {
  useEffect(() => {
    document.title = 'Marketplace | Facebook';
  }, []);

  return (
    <main className="marketplace">
      <Navbar />
      <div className='section'>
          <Sidebar title='MarketPlace' />
          <div className='marketplace-content'>
            <Produit />
            <Produit />
            <Produit />
            <Produit />
          </div>
      </div>
    </main>
  );
};

export default Marketplace;