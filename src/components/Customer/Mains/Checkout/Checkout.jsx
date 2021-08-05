import React from "react";
import "./style.scss";
import BannerProducts from "../Products/BannerProducts/BannerProducts";
import Instagram from "../Products/Instagram/Instagram";
import ContentCheckout from "./contentCheckout/ContentCheckout";
import Headers from '../../Header/Headers';
import Footer from '../../Footer/Footer'

const Checkout = () => {
  return (
    <div>
      <Headers></Headers>
      <BannerProducts></BannerProducts>
      <ContentCheckout></ContentCheckout>
      <Instagram></Instagram>
      <Footer></Footer>
    </div>
  );
};

export default Checkout;