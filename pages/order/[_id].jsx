import React, { useContext, useEffect, useReducer } from 'react'
import {Store} from  "../../contexts/StoreContext";
import { useSnackbar } from 'notistack';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import dynamic from 'next/dynamic';
import axios from 'axios';
import jsCookie from 'js-cookie';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
  }
}

const Order = ({params}) => {
    const {enqueueSnackbar} = useSnackbar();
     const { id: orderId } = params;
    const [{ loading, error, order, successPay }, dispatch] = useReducer(
    reducer,
        {
        loading: true,
        order: {},
        error: '',
        }
    );
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const {userInfo,cart} = useContext(Store)
  
    useEffect(() => {
    if (!userInfo) {
      return router.push('/Auth/Index');
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, successPay, paypalDispatch, router, userInfo]);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        enqueueSnackbar('Order is paid', { variant: 'success' });
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        enqueueSnackbar(getError(err), { variant: 'error' });
      }
    });
  }
  function onError(err) {
    enqueueSnackbar(getError(err), { variant: 'error' });
  }

  return (
    <div>
    {  loading ? (
        "Loading..."
      ) : error ? (
         enqueueSnackbar(error, { variant: 'error' })
      ) : (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Shipping Address Card */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          {/* Include details about shipping address and order status */}
          <p>Shipping Address: {cart.shippingAddress.fullname}, {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.country}</p>
          <p> Order Status:{' '}
                  {isDelivered
                    ? `delivered at ${deliveredAt}`
                    : 'not delivered'}</p>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          {/* Include details about payment method and payment status */}
          <p>Payment Method: {cart.paymentMethod}</p>
          <p>Payment Status: {isPaid ? `paid at ${paidAt}` : 'not paid'}</p>
        </div>

        {/* Order Items Card */}
        <div className="col-span-2 lg:col-span-3 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          {/* Include a list of ordered items */}
          <ul>
            <li>Product 1 - $20.00</li>
            {/* <li>Product 2 - $15.00</li> */}
            {/* Add more items as needed */}
          </ul>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {/* Include order summary details */}
          <p>Item Price: $ {itemPrice}</p>
          <p>Shipping Price: $ {shippingPrice}</p>
          <p>Is Paid: Yes</p>
          <p>Total: $ {totalPrice}</p>
          {/* PayPal Button */}
          {isPending ? (
                      "Loading..."
                    ) : (
                      <button className="bg-blue-100 px-4 py-2 mt-4 rounded-md">        
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                     </button>    
                    )}
        </div>
      </div>
    </div>
  )}

    </div>
  )
}
export function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });