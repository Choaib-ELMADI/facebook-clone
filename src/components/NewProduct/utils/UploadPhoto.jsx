import React from 'react';
import { BiImageAdd } from 'react-icons/bi';

import './UploadPhoto.scss';



const UploadPhoto = ({ setPhoto }) => {
    return (
        <div className='upload-product-photo'>
            <input 
                type="file"
                onChange={ (e) => setPhoto(e.target.files[0]) }
                id='product-photo'
                hidden
            />
            <label htmlFor="product-photo">
                <span>
                    <BiImageAdd size={ 26 } />
                </span>
                <h4>Ajouter photo</h4>
            </label>
        </div>
    );
};

export default UploadPhoto;