import React from 'react';

import './cart-item.scss';

const CartItem = ({ item: {price, name, imageUrl, quantity} }) => (
    <div className='cart-item'>
        <img src={imageUrl} alt='item'/>
        <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='price'>{quantity}x R${price}</span>
        </div>
    </div>
);

export default CartItem;