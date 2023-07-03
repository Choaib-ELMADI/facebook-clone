import React, { useState } from 'react';

import './NewProduct.scss';
import { Sidebar, Apercu } from './utils/index';
import { useAuth } from '../../context/AuthContext';



const NewProduct = () => {
    const { user } = useAuth();
    const [photo, setPhoto] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [formData, setFormData] = useState({
        prix: '',
        desc: '',
        place: '',
        state: '',
        owner: user.email.split('@')[0].replaceAll('.', ''),
    });

    return (
        <div className='new-product-wrap'>
            <Sidebar 
                photo={ photo }
                setPhoto={ setPhoto } 
                formData={ formData }
                setFormData={ setFormData }
                setHovered={ setHovered }
            />
            <Apercu 
                photo={ photo } 
                setPhoto={ setPhoto }
                formData={ formData }
                setFormData={ setFormData }
                hovered={ hovered }
            />
        </div>
    );
};

export default NewProduct;