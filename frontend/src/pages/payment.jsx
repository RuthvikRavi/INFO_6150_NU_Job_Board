import React from 'react';

import StripeCheckout from 'react-stripe-checkout';


const payment = ({ tour }) => {


  const {  city, photo, price, featured } = tour;

  const handleToken = (token) => {
    // make API call to your server to process payment
    fetch('/charge', {
      method: 'POST',
      body: JSON.stringify(token)
    })
    .then(response => {
      // payment successful
      //setPaid(true);
      console.log("Payment Success");
    })
    .catch(error => {
      // payment failed
      console.error(error);
    });
  }

  return <div className='tour__card'>
    
      <div className='tour__img'>
        <img src={photo} alt='tour-img' />
        {featured && <span>Featured</span>}
      </div>

      <div className="card__top d-flex align-items-center justify-content-between">
        <span className="tour location d-flex align-items-center gap-1">
          <i className="ri-map-pin-line"></i> {city}
        </span>
        
      </div>


      <div className="card__bottom d-flex align-items-center justify-content-between mt-3">

        <StripeCheckout
          token={handleToken}
          stripeKey='sk_test_51Myjc0JNnJKzFds8X4VrUY8d6UZTiIwgI03ekqVwXAmeAGgpjMbqSny0hPVQDVxUHX8PI80xm5PGLojAHpgVQzJd00W7Bwbk7D'
          amount={price * 100} // amount in cents
          currency='USD'
          name='Tour Booking'
          billingAddress
          shippingAddress
        >
          <button className="btn booking__btn">Book Now</button>
        </StripeCheckout>
            
      </div>
      


  </div>
};

export default payment;