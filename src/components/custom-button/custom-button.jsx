import React from 'react';

import './custom-button.scss';

const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => (
    <button className={`
    ${inverted ? 'inverted': ''}
    ${isGoogleSignIn ? 'google-button': ''} custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;