import React from 'react';
import { addDoc, collection } from 'firebase/firestore';

import './Apercu.scss';
import { db } from '../../../config/firebase';



const Apercu = ({ formData, setFormData, photo, setPhoto, hovered }) => {
    const hnadleAddProduct = () => {
        addDoc(collection(db, 'products'), {
            ...formData
        })
            .then(() => {
                setFormData({
                    prix: '',
                    desc: '',
                    place: '',
                    state: '',
                });
                setPhoto(null);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className='apercu-container'>
            <h4>Aperçu</h4>
            <div className='product-info-container'>
                <div 
                    className='product-photo'
                    style={{ borderColor: hovered === 'photo' ? 'var(--main_bleu_color)' : 'var(--gray_color_3)' }}
                >
                    { photo && (
                        <img
                            src={ URL.createObjectURL(photo) }
                            alt=''
                            draggable='false'
                            loading='lazy'
                        />
                    )}

                    { !photo && (
                        <div className='no-photo-yet'>
                            <h2>Aperçu de votre annonce</h2>
                            <h3>
                                Pendant que vous créez votre annonce, vous pouvez voir 
                                comment les autres la verront sur Marketplace.
                            </h3>
                        </div>
                    )}
                </div>
                <div className='product-info'>
                    <div className='inner'>
                        <div className='foo'>
                            <h2 
                                className={ formData.prix ? 'info active' : 'info'}
                                style={{ color: hovered === 'prix' ? 'var(--main_bleu_color)' : '' }}
                            >
                                { formData.prix ? `${ formData.prix } dh` : 'Prix' }
                            </h2>
                            <h3 
                                className={ formData.place ? 'info active' : 'info'}
                                style={{ color: hovered === 'place' ? 'var(--main_bleu_color)' : '' }}
                            >
                                { formData.place ? formData.place : 'Place' }
                            </h3>

                            <h4 className='details'>Details</h4>

                            <h4 
                                className={ formData.state ? 'info active' : 'info'}
                                style={{ color: hovered === 'state' ? 'var(--main_bleu_color)' : '' }}
                            >
                                <span style={{ marginRight: '3rem' }}>Etat</span>
                                <span>{ formData.state }</span>
                            </h4>
                            <p 
                                className={ formData.desc ? 'info active' : 'info' }
                                style={{ color: hovered === 'desc' ? 'var(--main_bleu_color)' : '' }}
                            >
                                { formData.desc ? formData.desc : 'La descriptionsera afficher ici' }
                            </p>
                        </div>
                    </div>
                    <div className='footer'>
                        <button
                            disabled={
                                !formData.prix ||
                                !formData.desc ||
                                !formData.place ||
                                !formData.state ||
                                !photo
                            }
                            onClick={ hnadleAddProduct }
                        >
                            Add product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Apercu;