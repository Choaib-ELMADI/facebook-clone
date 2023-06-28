import { useEffect } from 'react';

import './Marketplace.scss';
import { Navbar, Sidebar } from '../../components/index';



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
            <p>Produit</p>
            <p>Produit</p>
            <p>Produit</p>
            <p>Produit</p>
            <p>Produit</p>
          </div>
      </div>
    </main>
  );
};

export default Marketplace;