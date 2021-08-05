import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const CartTotal = ({ totalPrice, auth }) => {
  const history = useHistory();
  const [error, setError] = useState('');
  const handleCheckout = e => {

    const { accessToken } = auth || {};

    if (!accessToken) {
      setError("Please login to checkout!")
    } else if (totalPrice === 0) {
      setError("Please choose a product!")
    } else {
      history.push('/Checkout')
    }

  }

  return (
    <>
      <div className="total__price">
        <h1>Total Price</h1>
        <h1>${totalPrice}</h1>
      </div>
      <div className="promocode">
        <input
          type="text"
          className="form-control"
          placeholder="Promo code"
        ></input>
        <button type="button" className="btn btn-light">
          Apply
        </button>
      </div>
      <button type="button" className="btn btn-success" onClick={handleCheckout}>
        Checkout
        </button>
      <p className="errorLogin"> {error}</p>
    </>
  );
};

function mapStateToProps(state) {
  const {
    auth: { data }
  } = state;
  return { auth: data };
}


export default connect(mapStateToProps)(CartTotal);
