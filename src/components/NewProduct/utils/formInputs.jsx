import React, { useState } from 'react';

import './formInputs.scss';
const states = [
    "Neuf",
    "D'occasion, comme neuf",
    "D'occasion, bon état",
    "D'occasion, assez bon état",
];



const formInputs = ({ formData, setFormData, setHovered }) => {
    const [showStates, setShowStates] = useState(false);
    const [state, setState] = useState('');

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
                type='number'
                name='prix'
                placeholder='Prix'
                value={ formData.prix }
                onChange={ (e) => handelChange(e) }
                onPointerEnter={ () => setHovered('prix') }
                onPointerLeave={ () => setHovered(null) }
            />
            <input 
                type='text'
                name='place'
                placeholder='Place'
                value={ formData.place }
                onChange={ (e) => handelChange(e) }
                onPointerEnter={ () => setHovered('place') }
                onPointerLeave={ () => setHovered(null) }
            />
            <div 
                className='states-container'
                onPointerEnter={ () => setHovered('state') }
                onPointerLeave={ () => setHovered(null) }
            >
                <div 
                    className={ state === '' ? 'state' : 'state active' }
                    onClick={ () => setShowStates(!showStates) }
                >
                    { state === '' ? 'Etat' : state }
                </div>
                { showStates && (
                    <>
                        {
                            states.map((s) => (
                                <div 
                                    className={ state === s ? 'state choose active' : 'state choose' }
                                    key={ s }
                                    onClick={ () => {
                                        setState(s);
                                        setFormData({
                                            ...formData, state: s,
                                        });
                                        setShowStates(false);
                                    }}
                                >{ s }</div>
                            ))
                        }
                    </>
                )}
            </div>
            <input 
                type='text'
                name='desc'
                placeholder='Description'
                value={ formData.desc }
                onChange={ (e) => handelChange(e) }
                onPointerEnter={ () => setHovered('desc') }
                onPointerLeave={ () => setHovered(null) }
            />
        </div>
    );
};

export default formInputs;