import React from 'react';

import './menu-item.scss';

//define o html das categorias de produtos da homepage
const MenuItem = ({ title, imageUrl, size }) => (
    <div className={`${size} menu-item`}>

        <div className='background-image' style={{
        backgroundImage: `url(${imageUrl})` }}>

        </div>
        <div className='content'>
            <h1 className='title'>{ title.toUpperCase() }</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default MenuItem; 