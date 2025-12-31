import React from 'react';
import logo from "../../assets/logo.png"

const ProfastLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <p className='text-2xl md:text-4xl font-semibold -ml-3'>Profast</p>
        </div>
    );
};

export default ProfastLogo;