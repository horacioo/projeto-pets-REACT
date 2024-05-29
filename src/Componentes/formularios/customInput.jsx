import React from 'react';

function CustomInput({ label, value, onChange, nulo=0 }) {
    return (
        <>
            <label><span>{label}:</span>
            <input type="text" value={value} onChange={onChange} disabled={nulo === 1} />
            </label>
        </>
    );
}

export default CustomInput;
