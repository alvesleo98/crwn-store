
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I3sJqB2wmyPhNmS11rgwpz8jE0W09NWr3JKCt8vWcuefZvoTCbgxs35U4dgHvC4EnfN4gChqIqPTKdk5imE03NS00Fcq20FGv';

    const onToken = token => {
        console.log(token);
        alert('Payment Sucessful');
    }

    return (
        <StripeCheckout 
            name='CRWN Clothing Ltd.'
            label='Pay Now'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;