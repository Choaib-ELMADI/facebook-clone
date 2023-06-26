import React from 'react';
import { MdOutlineSettingsInputComponent } from 'react-icons/md';

import './Filter.scss';



const Filter = ({ setViewModel }) => {
    return (
        <div className='filter-posts'>
            <h3>Publications</h3>
            <button
                onClick={ () => {
                    setViewModel(true);
                }}
            >
                <MdOutlineSettingsInputComponent />
                Filter
            </button>
        </div>
        
    );
};

export default Filter;