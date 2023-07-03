import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import  { BsPlus } from 'react-icons/bs';

import './Marketplace.scss';
import { db } from '../../config/firebase';
import { Navbar, Sidebar } from '../../components/index';
import { useAuth } from '../../context/AuthContext';

const Produit = ({ product }) => {
  const { user } = useAuth();

  return (
    <Link 
      className='product-container'
      to={ 
        user.email.split('@')[0].replaceAll('.', '') === product.owner ?
        '/marketplace' :
        `/messages/${ user.email.split('@')[0].replaceAll('.', '') }/${ product.owner }` 
      }
    >
      <div className='product-photo'>
        <img 
          src={ product.photo }
          alt=''
          loading='lazy'
          draggable='false'
          referrerPolicy='no-referrer'
        />
      </div>
      <div className='product-details'>
        <p className='price'>{ product.prix } Dh</p>
        <p className='description'>{ product.desc }</p>
        <p className='place'>{ product.place }{ ', ' }{ product.state }</p>
      </div>
    </Link>
  );
};

const ProductModel = () => {
  return (
    <div className='product-model'>
      <div className='photo-model' />
      <div className='info-model'>
        <div className='price' />
        <div className='desc' />
        <div className='place' />
      </div>
    </div>
  );
};




const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Marketplace | Facebook';
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    let availableProducts = [];

    getDocs(collection(db, 'products'))
      .then((data) => {
        data.docs.forEach((product) => {
          availableProducts.push({ ...product.data() });
        });
        setProducts(availableProducts);
        setLoading(false);
        
      })
      .catch((err) => console.error(err));
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <ProductModel />
          <ProductModel />
        </>
      )
    }

    if (products.length < 1) {
      return (
        <div className='no-products'>No products</div>
      );
    }

    return (
      products.map((product, i) => (
        <Produit product={ product } key={ `product-${ i+1 }` } />
      ))
    )
  };

  return (
    <main className="marketplace">
      <Navbar />
      <div className='section'>
          <Sidebar title='MarketPlace' />

          <Link 
              className='new-add-item'
              to='/marketplace/create'
          >
              <BsPlus size={ 30 } />
          </Link>

          <div className='marketplace-content'>
            { renderContent() }
          </div>
      </div>
    </main>
  );
};

export default Marketplace;