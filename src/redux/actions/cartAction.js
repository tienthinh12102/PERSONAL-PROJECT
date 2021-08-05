// import React from "react";
import { ADD_PRODUCT_TO_CART, DECREASE_PRODUCT_TO_CART, DELETE_PRODUCT_IN_CART } from "../actions-constants/cart-constant";

export const addProductToCart = (data) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: data
  };
};

export const decreaseProductToCart = (data) => {
  return {
    type: DECREASE_PRODUCT_TO_CART,
    payload: data
  };
};
export const deleteProductInCart = (data) => {
  console.log(data)
  return {
    type: DELETE_PRODUCT_IN_CART,
    payload: data
  };
};



