// import React from "react";
import { GET_PRODUCTS, SET_DISPLAY, GET_PRODUCTS_SC, GET_PRODUCTS_ER, DELETE_PRODUCTS_START, DELETE_PRODUCTS_SUCCESS, DELETE_PRODUCTS_ERROR, GET_ITEM_PRODUCT_START, GET_ITEM_PRODUCT_SUCCESS, GET_ITEM_PRODUCT_ERROR, EDIT_ITEM_PRODUCT_START, EDIT_ITEM_PRODUCT_SUCCESS, EDIT_ITEM_PRODUCT_ERROR } from "../actions-constants/products-constant";


// ------------------- get all products-----------------------

export const getProducts = () => {
  return {
    type: GET_PRODUCTS,
  };
};

export const setDisplay = (data) => {
  return {
    type: SET_DISPLAY,
    payload: data
  };
};

export const getProductsSc = (data) => {
  return {
    type: GET_PRODUCTS_SC,
    payload: data
  };
};

export const getProductsEr = (data) => {

  return {
    type: GET_PRODUCTS_ER,
    payload: data
  };
};


// ------------------- delete item products-----------------------

export const deleteProductsStart = (data) => {
  console.log(data)
  return {
    type: DELETE_PRODUCTS_START,
    payload: data
  };
};

export const deleteProductsSuccess = (data) => {
  console.log(data)
  return {
    type: DELETE_PRODUCTS_SUCCESS,
    payload: data
  };
};

export const deleteProductsError = (data) => {
  console.log(data)
  return {
    type: DELETE_PRODUCTS_ERROR,
    payload: data
  };
};

// ------------------- get item products-----------------------

export const getItemProduct = (data) => {
  return {
    type: GET_ITEM_PRODUCT_START,
    payload: data
  };
};

export const getItemProductSc = (data) => {
  return {
    type: GET_ITEM_PRODUCT_SUCCESS,
    payload: data
  };
};

export const getItemProductEr = (data) => {
  return {
    type: GET_ITEM_PRODUCT_ERROR,
    payload: data
  };
};

// ------------------- edit item products-----------------------

export const editItemProduct = (data) => {
  return {
    type: EDIT_ITEM_PRODUCT_START,
    payload: data
  };
};

export const  editItemProductSc = (data) => {
  return {
    type: EDIT_ITEM_PRODUCT_SUCCESS,
    payload: data
  };
};

export const  editItemProductEr = (data) => {
  return {
    type: EDIT_ITEM_PRODUCT_ERROR,
    payload: data
  };
};