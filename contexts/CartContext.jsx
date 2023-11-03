// use client
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // item amount state
  const [itemAmount, setItemAmount] = useState(0);

  // total price
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);


  // update item amount 
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);


  // add items to cart
  const addToCart = (product, _id) => {
    const newItem = { ...product, amount: 1 };

    // check if the item is already in the cart
    const cartItem = cart.find(item => {
      return item._id === _id
    });
    // if cart item is already in the cart 
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if (item._id === _id) {
          return { ...item, amount: cartItem.amount + 1 };
        }
        else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // remove items from the cart 
  const removeFromCart = (_id) => {
    const newCart = cart.filter(item => {
      return item._id !== _id;
    });
    setCart(newCart);
  }

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  // increase amount
  const increaseAmount = (_id) => {
    const cartItem = cart.find((item) => item._id === _id);
    addToCart(cartItem, _id);
    console.log(cartItem);
  };

  // decrease amount
  const decreaseAmount = (_id) => {
    const cartItem = cart.find((item) => item._id === _id);

    if (cartItem) {
      const newCart = cart.map(item => {
        if (item._id === _id) {
          return { ...item, amount: cartItem.amount - 1 }
        }
        else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(_id);
    }

    // console.log(item);

  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
};


export default CartProvider;
