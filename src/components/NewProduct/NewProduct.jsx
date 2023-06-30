import React, { useState } from 'react';

import './NewProduct.scss';
import { Sidebar, Apercu } from './utils/index';



const NewProduct = () => {
    const [photo, setPhoto] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [formData, setFormData] = useState({
        prix: '',
        desc: '',
        place: '',
        state: '',
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
                formData={ formData }
                hovered={ hovered }
            />
        </div>
    );
};

export default NewProduct;