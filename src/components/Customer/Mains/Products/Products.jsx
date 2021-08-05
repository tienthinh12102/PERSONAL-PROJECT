import React from "react";
import BannerProducts from "./BannerProducts/BannerProducts";
import ProductDetails from "./ProductDetails/ProductDetails";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import Instagram from "./Instagram/Instagram";
import Headers from '../../Header/Headers';
import Footer from '../../Footer/Footer'

const Products = () => {
  return (
    <>
      <Headers></Headers>
      <BannerProducts></BannerProducts>
      <ProductDetails></ProductDetails>
      <RelatedProducts></RelatedProducts>
      <Instagram></Instagram>
      <Footer></Footer>
    </>
  );
};

export default Products;
