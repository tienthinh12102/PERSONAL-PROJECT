import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import product1 from "../../../../../assests/images/product-1.jpeg";
import { Link } from "react-router-dom";

ModalCart.propTypes = {
  showCart: PropTypes.bool,
  onToggleCart: PropTypes.func,
};

ModalCart.defaultProps = {
  showCart: false,
  onToggleCart: null,
};

function ModalCart(props) {
  const { showCart, onToggleCart } = props;

  function setStyle() {
    if (showCart) {
      return {
        transform: "translateX(-200%)",
        transition: "all 0.3s",
      };
    } else {
      return {
        transform: "translateX(100%)",
        transition: "all 0.3s",
      };
    }
  }

  function onHandleClick() {
    if (onToggleCart) {
      onToggleCart();
    }
  }

  return (
    <div className="cart" style={setStyle()}>
      <div className="cart__header">
        <i
          className="fa fa-times cart__header--close"
          aria-hidden="true"
          onClick={onHandleClick}
        ></i>
        <h3 className="cart__header--title">YOUR CART</h3>
        <p className="cart__header--count">2</p>
      </div>
      <div className="cart__main">
        <img src={product1} alt={product1} className="cart__main--img" />
        <div className="cart-group">
          <p className="cart-group__name">Candle Bowl</p>
          <p className="cart-group__quantity">QTY: 1</p>
          <p className="cart-group__price">$169.000</p>
        </div>
        <div className="cart__main--close">X</div>
      </div>
      <div className="cart__main">
        <img src={product1} alt={product1} className="cart__main--img" />
        <div className="cart-group">
          <p className="cart-group__name">Candle Bowl</p>
          <p className="cart-group__quantity">QTY: 1</p>
          <p className="cart-group__price">$169.000</p>
        </div>
        <div className="cart__main--close">X</div>
      </div>
      <div className="cart__main">
        <img src={product1} alt={product1} className="cart__main--img" />
        <div className="cart-group">
          <p className="cart-group__name">Candle Bowl</p>
          <p className="cart-group__quantity">QTY: 1</p>
          <p className="cart-group__price">$169.000</p>
        </div>
        <div className="cart__main--close">X</div>
      </div>
      <div className="cart__total">
        <p className="cart__total--text">Total:</p>
        <p className="cart__total--price">$190.000</p>
      </div>
      <div className="cart__action">
        <Link to="/Checkout">
          <button className="cart__action--checkout">CHECKOUT</button>
        </Link>
      </div>
    </div>
  );
}

export default ModalCart;
