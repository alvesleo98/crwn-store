import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.jsx';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.jsx';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import './checkout.scss';

const CheckoutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))
        }
        <div className='total'>
            <span>TOTAL: R${total}</span>
            <div className='test-warning'>
                *Cartao de Credito para teste*
                <br/>
                4242 4242 4242 4242 - Exp: 01/23 - CVV: 123
            </div>
            <StripeCheckoutButton price={total} />
        </div>
    </div>  
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);