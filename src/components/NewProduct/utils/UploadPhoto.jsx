import React, { useEffect } from 'react';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { BiImageAdd } from 'react-icons/bi';

import './UploadPhoto.scss';
import { store } from '../../../config/firebase';



const UploadPhoto = ({ photo, setPhoto, setFormData, setHovered }) => {
    useEffect(() => {
        if (!photo) return;

        const uploadProductImage = () => {
            const productImageRef = ref(store, `/products/${ new Date().getTime() }__${ photo.name }`);
            const uploadTask = uploadBytesResumable(productImageRef, photo);

            uploadTask.on('state_changed', 
                (snapshot) => {}, 
                (error) => console.error(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setFormData(
                                (prev) => ({ ...prev, photo: downloadURL })
                            );
                        });
                }
            );
        };
        
        uploadProductImage();
    }, [photo]);

    return (
        <div 
            className='upload-product-photo'
            onPointerEnter={ () => setHovered('photo') }
            onPointerLeave={ () => setHovered(null) }
        >
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