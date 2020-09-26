import React, { createContext, useState, useEffect } from "react";

import { addItemToCart, removeItemFromCart, filterItemFromCart, getCartItemsCount, getTotalValue } from "./cart.utils";

// The Cart Context with it values and functions
export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFormCart: () => {},
  cartItemsCount: 0,
  total: 0
});

const CartProvider = ({ children }) => {
  // Values that will use the CartContext to propagate from here to the tree (children)
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item)); // add an item to the cartItems array
  const removeItem = (item) => setCartItems(removeItemFromCart(cartItems, item)); // remove an item from the cartItems array
  const toggleHidden = () => setHidden(!hidden); // function to change the hidden value of the cart
  const clearItemFormCart = (item) => setCartItems(filterItemFromCart(cartItems, item)); // get the number of items

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems)); // get the number of items in the cart eveytime the cartItems changed
    setTotal(getTotalValue(cartItems)); // get the total value of the cart at checkout
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItemFormCart,
        cartItemsCount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
