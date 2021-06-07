import React from 'react';

const Filter = ({filterContent}) => {
    return (
        <div>
            <label className="label">
                Filter shown with
            </label>
            <input className="input" onChange={filterContent} /> 
        </div>
    );
};

export default Filter;