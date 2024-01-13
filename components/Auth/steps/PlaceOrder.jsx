import React, { useContext, useState } from 'react'
import StepsAnimateFramer from '../StepsAnimateFramer';
import Image from "next/image";
import {urlFor} from "../../../utils/image";
import { Store } from '../../../contexts/StoreContext';
import dynamic from 'next/dynamic';
import axios from 'axios';
const PlaceOrder = () => {
  const { cart, clearCart, total, itemAmount } = useContext(Store);
  

  return (
    <StepsAnimateFramer>
        <div>
           <div className="min-h-screen bg-white py-6">
            <div className="grid grid-cols-2">
              
            </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Place Your Order</h2>
        </div>

        {/* Payment Method Card */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Method</h3>
          <p className="text-gray-600">{cart.paymentMethod}</p>
        </div>

        {/* Shipping Address Card */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Address</h3>
          <p className="text-gray-600">{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
        </div>

        {/* Order Items Card */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Items</h3>
          {/* Loop through your cart items and display them here */}
          <div className="text-gray-600">
            <div className="">
              
            </div>
            {/* <div className="flex justify-between mb-2">
              <span>Product 2</span>
              <span>$30.00</span>
              </div> */}
            {/* Add more items as needed */}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Summary</h3>
          <div className="text-gray-600">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>$80.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>$ {total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    </StepsAnimateFramer>

  )
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });