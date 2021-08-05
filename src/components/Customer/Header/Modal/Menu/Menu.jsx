import PropTypes from "prop-types";
import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

ModalMenu.propTypes = {
  showMenu: PropTypes.bool,
  onHandleToggleMenu: PropTypes.func,
};

ModalMenu.defaultProps = {
  showMenu: false,
  onHandleToggleMenu: null,
};

function ModalMenu(props) {
  const { showMenu, onHandleToggleMenu } = props;

  function setStyle() {
    if (showMenu) {
      return {
        transform: "translateX(0%)",
        transition: "all 0.3s",
      };
    } else {
      return {
        transform: "translateX(-100%)",
        transition: "all 0.3s",
      };
    }
  }

  function onHandleShowMenu() {
    if (onHandleToggleMenu) {
      onHandleToggleMenu();
    }
    return;
  }

  return (
    <div className="menu" style={setStyle()}>
      <h2 className="menu__title">MENU</h2>
      <ul className="menu__list">
        <Link to="/HomePage">
          <li className="menu__list--item">Home</li>
        </Link>
        <Link to="/ShopPage">
          <li className="menu__list--item">Shop</li>
        </Link>
        <li className="menu__list--item">Features</li>
        <li className="menu__list--item">Portfolio</li>
        <li className="menu__list--item">Blog</li>
        <li className="menu__list--item">About Us</li>
      </ul>
      <button className="menu__close" onClick={onHandleShowMenu}>
        X
      </button>
    </div>
  );
}

export default ModalMenu;
