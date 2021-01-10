import { CartActionTypes } from './cart.types';
import { AddItemToCart, RemoveItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    //armazena os items do carrinho
    cartItems: []
}

const CartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                //adiciona os items que ja estao no carrinho, e os novos caso existam
                cartItems: AddItemToCart(state.cartItems, action.payload)
            }

        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: RemoveItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        default:
            return state
    }
}

export default CartReducer;