export const AddItemToCart = (cartItems, newItem) => {
    //verifica se existem items repetidos no array do carrinho
    const existingCartItems = cartItems.find(cartItem => cartItem.id === newItem.id);

    if(existingCartItems){
        //verifica se o item a ser inserido já esta no array
        return cartItems.map(cartItem =>
            cartItem.id === newItem.id 
            ? {...cartItem, quantity: cartItem.quantity +1}  : cartItem  
        )
    }

    //caso o item nao esteja no array, retorna o array do carrinho + o novo item
    return [...cartItems, {...newItem, quantity: 1}];
};

export const RemoveItemFromCart = (cartItems, itemToRemove) => {
    //verifica se o item está no reducer do cart
    const existingCartItem = cartItems.find(cartItem => cartItem.id === itemToRemove.id);

    //se a quantidade do item for 1, ao chamar a função novamente remove o item do carrinho
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
    }

    //percorre o carrinho ate o item e diminui a quantidade
    return cartItems.map(cartItem =>
        cartItem.id === itemToRemove.id ? {...cartItem, quantity: cartItem.quantity -1} : cartItem
    );
};