import React from 'react';
import { Link } from 'react-router-dom';

import './CreateProduct.scss';
import { Navbar } from '../../components/index';
import images from '../../constants/images';

const types = [
    {
        type: 'Article',
        bg: '#f2bfce',
        icon: images.article,
        desc: 'Créez une seule annonce pour un ou plusieurs articles à vendre.',
    },
    {
        type: 'Véhicule',
        bg: '#ade1d9',
        icon: images.vehicule,
        desc: 'Vends une voiture, un camion, ou un autre type de véhicule.',
    },
    {
        type: 'Immobilier',
        bg: '#f2decd',
        icon: images.immobilier,
        desc: 'Passez une annonce pour une maison ou un appartement à vendre ou à louer.',
    },
];

const Type = ({ props }) => {
    return (
        <Link 
            className='product-type'
            to='/marketplace/create/new'
        >
            <img 
                src={ props.icon }
                alt=''
                loading='lazy'
                draggable='false'
                style={{
                    background: props.bg
                }}
            />
            <p className='title'>{ `${ props.type } à vendre` }</p>
            <p className='desc'>{ props.desc }</p>
        </Link>
    );
};



const CreateProduct = () => {
    return (
        <div className='create-new-product'>
            <Navbar />
            <div className='product-types-container'>
                <h3>Choisissez le type d'annonce</h3>
                <div className='product-types'>
                    {
                        types.map((type, i) => (
                            <Type key={ i } props={ type } />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;