// import React from "react";
import { ADD_ORDER, ADD_ORDER_SC, ADD_ORDER_ER, GET_ORDER, GET_ORDER_ER, GET_ORDER_SC } from "../actions-constants/order-constant";

export const addOrder = (data) => {
  return {
    type: ADD_ORDER,
    payload: data
  };
};


export const addOrderSc = (data) => {
  return {
    type: ADD_ORDER_SC,
    payload: data
  };
};

export const addOrderEr = (data) => {
  return {
    type: ADD_ORDER_ER,
    payload: data
  };
};

// ---------GET ORDER--------------

export const getOrder = () => {
  return {
    type: GET_ORDER
  };
};

export const getOrderSc = (data) => {
  return {
    type: GET_ORDER_SC,
    payload: data
  };
};

export const getOrderEr = (data) => {
  return {
    type: GET_ORDER_ER,
    payload: data
  };
};