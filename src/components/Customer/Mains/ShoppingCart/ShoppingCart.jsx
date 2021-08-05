import React from "react";
import BannerProducts from "../Products/BannerProducts/BannerProducts";
import ContentShoppingCart from "./ContentShoppingCart/ContentShoppingCart";
import Instagram from "../Products/Instagram/Instagram";
import Headers from '../../Header/Headers';
import Footer from '../../Footer/Footer'


const ShoppingCart = () => {
  return (
    <div>
      <Headers></Headers>
      <BannerProducts></BannerProducts>
      <ContentShoppingCart></ContentShoppingCart>
      <Instagram></Instagram>
      <Footer></Footer>
    </div>
  );
};

export default ShoppingCart;
