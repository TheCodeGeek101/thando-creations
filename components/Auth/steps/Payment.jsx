import React, { useContext, useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import { useSnackbar } from 'notistack';
import { Store } from '../../../contexts/StoreContext';
import Image from 'next/image';
import StepsAnimateFramer from '../StepsAnimateFramer';

const Payment = () => {
    const {state,dispatch} = useContext(Store);
    const [selectedMethod, setSelectedMethod] = useState('paypal');
    const { enqueueSnackbar } = useSnackbar();
     const {
        cart: { shippingAddress },
     } = state;

    useEffect(() => {
        if (!shippingAddress.address) {
            console.log("Shipping address is missing");

        // router.push('/shipping');
        } else {
        setPaymentMethod(jsCookie.get('paymentMethod') || '');
        }
    }, [ shippingAddress]);
    
//     const submitHandler = (e) => {
//     e.preventDefault();

//     if (!selectedMethod) {
//       enqueueSnackbar('Payment method is required', { variant: 'error' });
//     } else {
//       dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedMethod });
//       jsCookie.set('paymentMethod', selectedMethod);
//     }
//   };
   const handleMethodChange = (event) => {
    if (!selectedMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedMethod });
      jsCookie.set('paymentMethod', selectedMethod);
      setSelectedMethod(event.target.value);
    }
  };
    const paymentMethods = [
        { id: 'paypal', label: 'PayPal', image: '/paypal.png' },
        { id: 'stripe', label: 'Stripe', image: '/stripe.png' },
        { id: 'cash', label: 'Cash on Delivery', image: '/cash.jpg' },
        // Add more payment methods here
    ];
  return (
    <StepsAnimateFramer>

     <div className="space-y-4 ">
       <div className="w-full text-center font-medium text-2xl capitalize md:text-2xl mb-7 mt-0 md:mt-7 text-gray-800">
          Select Payment Method
        </div>
      <div>
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center">
            <input
              type="radio"
              id={method.id}
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={handleMethodChange}
              className="mr-2"
            />
            <label className='flex mt-5 gap-4 p-4 rounded-xl bg-gray-200 bg-opacity-90 shadow-xl hover:bg-opacity-75 peer-check:bg-purple-900 peer-checked:text-white transition cursor-pointer' htmlFor=
                
            {method.id}>
                 <Image
                    src={method.image}
                    width={50}
                    height={50}
                    alt="Picture of payment method"
                    />
                </label>
          </div>
        ))}
      </div>
      {/* <p>You've selected: {selectedMethod}</p> */}
    </div>
    </StepsAnimateFramer>

  )
}

export default Payment;