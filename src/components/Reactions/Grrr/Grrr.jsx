import React from 'react';

import './Grrr.scss';



const Grrr = ({ zIndex }) => {
    return (
        <div className='reaction grrr-reaction' style={{ zIndex }}>
            <div className="face">
                <div className='eye left'></div>
                <div className='eye right'></div>
                <div className='mouth'></div>
            </div>
        </div>
    );
};

export default Grrr;