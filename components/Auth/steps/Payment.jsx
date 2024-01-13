import React, { useContext, useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import { useSnackbar } from 'notistack';
import { Store } from '../../../contexts/StoreContext';
import Image from 'next/image';
import StepsAnimateFramer from '../StepsAnimateFramer';

const Payment = () => {
    const {cart,setPaymentMethod} = useContext(Store);
    const [selectedMethod, setSelectedMethod] = useState('paypal');
    const { enqueueSnackbar } = useSnackbar();
  
    useEffect(() => {
      console.log("shipping address: " + JSON.stringify(cart.shippingAddress));
        if (!cart.shippingAddress.address) {
          enqueueSnackbar('Shipping address is missing', { variant: 'error' });
            console.log("Shipping address is missing");

        // router.push('/shipping');
        } else {
        setPaymentMethod(jsCookie.get('paymentMethod') || '');
        }
    }, [ cart.shippingAddress]);
    
   const handleMethodChange = (event) => {
    if (!selectedMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      const selectedMethodValue = event.target.value;
      setSelectedMethod(selectedMethodValue); // Update the selected payment method state
      setPaymentMethod(selectedMethodValue); // Save the selected payment method to context
      jsCookie.set('paymentMethod', selectedMethodValue);
      console.log("Payment method: " + selectedMethodValue);
      // save the method to context
      setPaymentMethod(selectedMethodValue);
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
          <div  className="flex items-center">
            <input
              type="radio"
              id='paypal'
              value='paypal'
              checked={selectedMethod === 'paypal'}
              onChange={handleMethodChange}
              className="mr-2"
            />
            <label className='flex mt-5 gap-4 p-4 rounded-xl bg-gray-200 bg-opacity-90 shadow-xl hover:bg-opacity-75 peer-check:bg-purple-900 peer-checked:text-white transition cursor-pointer' htmlFor='paypal'
             >
                 <Image
                    src='/paypal.png'
                    width={50}
                    height={50}
                    alt="Picture of payment method"
                    />
                </label>
          </div>
          <div  className="flex items-center">
            <input
              type="radio"
              id='stripe'
              value='stripe'
              checked={selectedMethod === 'stripe'}
              onChange={handleMethodChange}
              className="mr-2"
            />
            <label className='flex mt-5 gap-4 p-4 rounded-xl bg-gray-200 bg-opacity-90 shadow-xl hover:bg-opacity-75 peer-check:bg-purple-900 peer-checked:text-white transition cursor-pointer' htmlFor=
                
            'stripe'>
                 <Image
                    src='/stripe.png'
                    width={50}
                    height={50}
                    alt="Picture of payment method"
                    />
                </label>
          </div>
          <div  className="flex items-center">
            <input
              type="radio"
              id='cash'
              value='cash'
              checked={selectedMethod === 'cash'}
              onChange={handleMethodChange}
              className="mr-2"
            />
            <label className='flex mt-5 gap-4 p-4 rounded-xl bg-gray-200 bg-opacity-90 shadow-xl hover:bg-opacity-75 peer-check:bg-purple-900 peer-checked:text-white transition cursor-pointer' htmlFor=
                
            'cash'>
                 <Image
                    src='/cash.jpg'
                    width={50}
                    height={50}
                    alt="Picture of payment method"
                    />
                </label>
          </div>
      
      </div>
      {/* <p>You've selected: {selectedMethod}</p> */}
    </div>
    </StepsAnimateFramer>

  )
}

export default Payment;