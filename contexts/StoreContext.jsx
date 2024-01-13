import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

export const StoreProvider = ({ children }) => {
  // Initialize dark mode state
  const [darkMode, setDarkMode] = useState(() => Cookies.get('darkMode') === 'ON');

  // Initialize cart state
  const [cart, setCart] = useState(() => {
    const cartItems = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [];
    const shippingAddress = Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {

      };
    const paymentMethod = Cookies.get('paymentMethod') || '';

    return {
      cartItems,
      shippingAddress,
      paymentMethod,
    };
  });

  // Initialize user info state
  const [userInfo, setUserInfo] = useState(() => {
    const userInfoCookie = Cookies.get('userInfo');
    if (userInfoCookie) {
      try {
        return JSON.parse(userInfoCookie);
      } catch (error) {
        console.error("Error parsing 'userInfo' cookie:", error);
        return null; // Handle the case where the cookie data is not valid JSON
      }
    }
    return null; // Handle the case where the cookie is not set
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    Cookies.set('darkMode', darkMode ? 'OFF' : 'ON');
  };

  // Set cart items
  const setCartItems = (cartItems) => {
    const updatedCart = { ...cart, cartItems };
    setCart(updatedCart);
   Cookies.set('cartItems', JSON.stringify(cartItems)); 
  };



  // add items to cart
  const addToCart = (product, _id) => {
    // const {cartItems} = cart;
    const newItem = { ...product, amount: 1 };

    // check if the item is already in the cart
    const cartItem = cart.cartItems.find(item => {
      return item._id === _id
    });
    // if cart item is already in the cart 
    if (cartItem) {
      const newCart = [...cart.cartItems].map(item => {
        if (item._id === _id) {
          return { ...item, amount: cartItem.amount + 1 };
        }
        else {
          return item;
        }
      });
      setCart([...newCart]);
      Cookies.set('cartItems', JSON.stringify([...newCart]));

    } else {
      setCart([...cart.cartItems, newItem]);
      Cookies.set('cartItems', JSON.stringify([...cart.cartItems, newItem]));

    }
  };



  // remove items from the cart 
  const removeFromCart = (_id) => {
    const newCart = cart.cartItems.filter(item => {
      return item._id !== _id;
    });
    setCart(newCart);
    Cookies.set('cartItems', JSON.stringify(newCart));
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // item amount state
  const [itemAmount, setItemAmount] = useState(0);

  // total price
  const [total, setTotal] = useState(0);
  useEffect(() => {
  const total = cart.cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.amount;
  }, 0);
  setTotal(total);
}, [cart]);



  // update item amount 
  useEffect(() => {
    if (cart) {
      const amount = cart.cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  // increase amount
  const increaseAmount = (_id) => {
    const cartItem = cart.cartItems.find((item) => item._id === _id);
    addToCart(product, _id);
    console.log(cartItem);
  };

  // decrease amount
  const decreaseAmount = (_id) => {
    const cartItem = cart.cartItems.find((item) => item._id === _id);

    if (cartItem) {
      const newCart = cart.cartItems.map(item => {
        if (item._id === _id) {
          return { ...item, amount: cartItem.amount - 1 }
        }
        else {
          return item;
        }
      });
      setCart(newCart);
      Cookies.set('cartItems', JSON.stringify(newCart));
    }
    if (cartItem.amount < 2) {
      removeFromCart(_id);
    }

    // console.log(item);

  };

  // Set user information
  const setUserInfoData = (userInfoData) => {
    setUserInfo(userInfoData);
    Cookies.set('userInfo', JSON.stringify(userInfoData));
  };

  // Set shipping address
 const setShippingAddress = (addressData) => {
  
  const updatedCart = { ...cart, shippingAddress: addressData };
  setCart(updatedCart);
  Cookies.set('shippingAddress', JSON.stringify(addressData));
  };

  // Set payment method
  const setPaymentMethod = (method) => {
    const updatedCart = { ...cart, paymentMethod: method };
    setCart(updatedCart);
    Cookies.set('paymentMethod', method);
  };

  return (
    <Store.Provider
      value={{
        darkMode,
        toggleDarkMode,
        cart,
        setCart,
        // setCartItems,
        removeFromCart,
        clearCart,
        userInfo,
        setUserInfoData,
        setShippingAddress,
        setPaymentMethod,
        increaseAmount,
        decreaseAmount,
        total,
        addToCart,
        itemAmount
      }}
    >
      {children}
    </Store.Provider>
  );
};


