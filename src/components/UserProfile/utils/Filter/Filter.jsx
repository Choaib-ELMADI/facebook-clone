import React, { useState, useEffect } from 'react';
import { MdOutlineSettingsInputComponent } from 'react-icons/md';

import './Filter.scss';
import FilterModel from '../FilterModel/FilterModel';



const Filter = ({ filterUserPostsByYear, selectedYear, setSelectedYear }) => {
    const [viewModel, setViewModel] = useState(false);

    useEffect(() => {
        if (viewModel) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [viewModel]);

    return (
        <>
            <div className='filter-posts'>
                <h3>Publications</h3>
                <button
                    onClick={ () => setViewModel(true) }
                >
                    <MdOutlineSettingsInputComponent />
                    Filter
                </button>
            </div>

            { viewModel && (
                <FilterModel
                    setViewModel={ setViewModel }
                    selectedYear={ selectedYear }
                    setSelectedYear={ setSelectedYear }
                    filterUserPostsByYear={ filterUserPostsByYear }
                />
            )}
        </>
        
    );
};

export default Filter;