import React from "react";
import { useHistory } from "react-router-dom";

const NavMenu = () => {

  const history = useHistory();

  function onRedirectHome() {
    history.push(`/HomePage`)
  }

  function onRedirectShop() {
    history.push(`/ShopPage`)
  }

  return (
    <ul className="header__menu">
      <li onClick={onRedirectHome} className="header__menu--item">Home</li>
      <li onClick={onRedirectShop} className="header__menu--item">Shop</li>
      <li className="header__menu--item">Features</li>
      <li className="header__menu--item">Portfolio</li>
      <li className="header__menu--item">Blog</li>
      <li className="header__menu--item">About Us</li>
    </ul>
  );
};

export default NavMenu;
