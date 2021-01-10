import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.jsx';
import CartItem from '../cart-item/cart-item.jsx';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { ToggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'> 
            {
                //verifica se existem itens no carrinho caso contrario exibe mensagem
                cartItems.length ? 
                //mapeia os item que estao no carrinho e adiciona ao dropdown
                (cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>))
                :
                (<span className='empty-cart'>Your cart is empty</span>)
            }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout')
            dispatch(ToggleCartHidden())
        }}>Finalizar Compra</CustomButton>
    </div>
);

//obtem o reducer do carrinho do root e torna acessivel no componente
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));