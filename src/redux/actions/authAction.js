// import React from "react";
import { LOGIN_START, LOGIN_SC, LOGIN_ER, LOGOUT } from "../actions-constants/auth-constant";

export const logout = () => {
  return {
    type: LOGOUT
  };
};


export const loginStart = (data) => {
  return {
    type: LOGIN_START,
    payload: data
  };
};

export const loginSc = (data) => {
  return {
    type: LOGIN_SC,
    payload: data
  };
};

export const loginEr = (data) => {
  return {
    type: LOGIN_ER,
    payload: data
  };
};
