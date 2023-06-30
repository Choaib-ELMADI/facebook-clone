import React, { useState } from 'react';

import './NewProduct.scss';
import { Sidebar } from './utils/index';



const NewProduct = () => {
    const [photo, setPhoto] = useState(null);
    const [formData, setFormData] = useState({
        prix: '',
        desc: '',
        place: '',
    });

    return (
        <div>
            <Sidebar 
                setPhoto={ setPhoto } 
                formData={ formData }
                setFormData={ setFormData }
            />
        </div>
    );
};

export default NewProduct;