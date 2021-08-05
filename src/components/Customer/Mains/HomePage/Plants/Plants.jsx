import React from "react";
import "./style.scss";

function Plants(props) {
  return (
    <div className="plants">
      <div className="plants__overlay" />
      <div className="plants__title">
        <p>Composters For Healthy Planet</p>
        <h2>Plants For Healthy</h2>
        <button className="btn btn--primary plants__title-group">
          <div className="plants__title-group--overlay"></div>
          <span>Discovery Now</span>
          <span><i className="fa fa-long-arrow-right"></i></span>
        </button>
      </div>
    </div>
  )
}

export default Plants;
