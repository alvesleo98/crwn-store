import { CartActionTypes } from './cart.types';

export const ToggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
})

export const AddItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const RemoveItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})

export const ClearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
})