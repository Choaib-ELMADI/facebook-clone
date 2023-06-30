import React from 'react';

import './formInputs.scss';



const formInputs = ({ formData, setFormData }) => {
    const handelChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value,
        });
    };

    return (
        <div className='form-data'>
            <div className='obligation'>
                <h3>Obligatoire</h3>
                <p>Donnez le plus de détails possible</p>
            </div>
            <input 
                type='text'
                name='prix'
                placeholder='Prix'
                value={ formData.prix }
                onChange={ (e) => handelChange(e) }
            />
            <input 
                type='text'
                name='desc'
                placeholder='Description'
                value={ formData.desc }
                onChange={ (e) => handelChange(e) }
            />
            <input 
                type='text'
                name='place'
                placeholder='Place'
                value={ formData.place }
                onChange={ (e) => handelChange(e) }
            />
        </div>
    );
};

export default formInputs;