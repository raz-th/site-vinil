'use client';
import React from 'react';
import './ProfileDrawer.css';

const CustomInput = ({
    label,
    type,
    placeholder,
    readOnly = true,
    value,
    onChange,
    required = true,
    name,
}) => {
    return (
        <div className="pd-input-group">
            <label className="pd-input-label">{label}</label>
            <div className="pd-input-wrapper" style={readOnly ? {} : { borderBottom: 'var(--accent2) 1px solid' }}>
                <input
                    type={type}
                    placeholder={readOnly ? "" : placeholder}
                    className="pd-custom-input"
                    required={required}
                    value={value}
                    onChange={(e) => onChange ? onChange(e.target.value) : null}
                    name={name}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
};

export default CustomInput;