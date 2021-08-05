import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const BannerProducts = () => {
  return (
    <section className="container-fluid product__banner">
      <div className="product__banner--overlay">
        <h2 className="product__banner--title">Shop Products</h2>
        <div className="product__banner--item">
          <Link to="/HomePage">
            <li>Home</li>
          </Link>
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
          <Link to="/ShopPage">
            <li className="item__content"> Shop Products</li>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BannerProducts;
