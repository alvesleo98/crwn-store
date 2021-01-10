//aq sera adicionado algumas tarefas no reducer do carrinho que serao executadas mais de uma vez 

import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

//seleciona os item do carrinho
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

//seletor que faz a contagem dos items
export const selectCartItemsCount = createSelector(
    //faz a contagem dos item do carrinho
    [selectCartItems],
    cartItems => cartItems.reduce(
        (soma, cartItem) => soma + cartItem.quantity, 0
    )
);

//calcula o total do carrinho
export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (soma, cartItem) => soma+ cartItem.quantity * cartItem.price, 0
    )
);