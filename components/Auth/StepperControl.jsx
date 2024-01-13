import React, { useContext,useState } from 'react'
import { Store } from '../../contexts/StoreContext';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import axios from 'axios';
import jsCookie from 'js-cookie';


const StepperControl = ({handleClick, currentStep, steps}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const {cart,userInfo, clearCart} = useContext(Store);
  const shippingAddress = cart.shippingAddress;
  const paymentMethod = cart.paymentMethod;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

   const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems.map((x) => ({
            ...x,
            countInStock: undefined,
            slug: undefined,
          })),
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log("Token is:" + userInfo.token);
      console.log("data is : " + data);
      clearCart();
      jsCookie.remove('cartItems');
      setLoading(false);
      router.push(`/order/${data}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(err, { variant: 'error' });
      console.error("error encountered is: " + err);
    }
  };

 const controlHandleClick = async (btnName) => {
    
  // Handle button functionality
    if (btnName === 'Next') {
      if (
        cart.shippingAddress.fullname &&
        cart.shippingAddress.phone &&
        cart.shippingAddress.address &&
        cart.shippingAddress.postalCode &&
        cart.shippingAddress.country &&
        cart.shippingAddress.city 
      ) {
        handleClick('Next');
      } else if (
        !cart.paymentMethod        
      ) {
        enqueueSnackbar("Please fill out the required fields", { variant: 'error' });
        return;
      } 
      else {
        handleClick('Next');
      }
    } 
    else if (btnName === 'Confirm') {
      console.log(cart.shippingAddress + cart.paymentMethod);

      // Check if cart is empty
      if (cart) {
        await placeOrderHandler();
      } else {
        enqueueSnackbar("please fill out the required fields", { variant: 'error' });
        return;
      }
      handleClick('Next');
    }
  };



  return (
    <div className='flex justify-around container mt-4 mb-8'>
        {/* back button */}
        <button
         onClick={() => handleClick()}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out
            ${currentStep == 1 ? "opacity-50 cursor-not-allowed" : ""}
        `}>
            Back
        </button>
        {/* next button */}
        <button 
        onClick={() =>
            controlHandleClick(
              currentStep === steps.length - 1 ? 'Confirm' : 'Next'
            )
          }
        className='bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer 
         border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out'>
            {currentStep == steps.length - 1 ? "Confirm" : "Next"}
        </button>
    </div>
  );
}

export default StepperControl;