import React, { useState } from 'react';
import './FilterModel.scss';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
const datesList = ['Année', 2023, 2022, 2021, 2020, 2019];



const FilterModel = ({ setViewModel, selectedYear, setSelectedYear, filterUserPostsByYear }) => {
    const [viewList, setViewList] = useState(false);

    return (
        <div className='filter-model-wrapper'>
            <div className='filter-model-wrapper__content'>
                <span 
                    className='close'
                    onClick={ () => setViewModel(false) }
                >X</span>
                <h3>Filtres de publication</h3>
                <div className='filter-main-section'>
                    <div className='select'>
                        <p>Accéder à :</p>
                        <button
                            onClick={ () => setViewList(!viewList) }
                        >
                            { selectedYear }
                            <TbTriangleInvertedFilled size={ 14 } />
                        </button>

                        { viewList && (
                            <div className='dates-wrapper'>
                                {
                                    datesList.map(date => (
                                        <button 
                                            key={ date }
                                            onClick={ () => {
                                                setSelectedYear(date);
                                                setViewList(false);
                                            }}
                                            className={ selectedYear === date ? 'active' : '' }
                                        >
                                            { date }
                                        </button>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                    <div className='confirm'>
                        <button
                            onClick={ () => setViewModel(false) }
                        >
                            Effacer
                        </button>
                        <button 
                            className='confirm'
                            onClick={ () => {
                                setViewModel(false);
                                filterUserPostsByYear(selectedYear);
                            }}
                        >
                            Terminé
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModel;