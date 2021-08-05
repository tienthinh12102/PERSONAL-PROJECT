import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductContent from "./ProductContent/ProductContent";
import ProductContentTabs from "./ProductContentTabs/ProductContentTabs";
import ProductSlideShow from "./ProductSlideShow/ProductSlideShow";
import "./style.scss";

const ProductDetails = () => {

  const product = useSelector(state => state.relatedProduts.relatedProducts)
  const { thumbnailUrl } = product || {};

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <section className="productDetails__container container">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          {product && <ProductSlideShow thumbnailUrl={thumbnailUrl} />}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          {product && <ProductContent product={product} />}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <ProductContentTabs />
        </div>
      </div>
    </section>
  );
};


export default ProductDetails;
