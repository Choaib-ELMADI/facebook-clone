import './Marketplace.scss';
import { Navbar, Sidebar } from '../../components/index';



const Marketplace = () => {
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