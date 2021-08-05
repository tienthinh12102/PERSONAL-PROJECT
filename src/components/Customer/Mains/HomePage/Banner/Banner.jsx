import React from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";

function Banner() {

  const history = useHistory();

  function onRedirectHome() {
    history.push(`/ShopPage`)
  }

  return (
    <div className="banner">
      <div className="banner__overlay" />
      <div className="banner__title">
        <h2>Spring House </h2>
        <h2>Plant The Perfect Choise!</h2>
        <p>Bring Fresher To Your Architecture</p>
        <button className="btn btn--primary banner__title-group">
          <div className="banner__title-group--overlay"></div>
          <span onClick={onRedirectHome}>Shop Now</span>
          <span>
            <i className="fa fa-long-arrow-right"></i>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Banner;
