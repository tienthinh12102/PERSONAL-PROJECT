import React from "react";
import "./style.scss";
import avartar1 from "../../../../../assests/images/avartar-1.jpeg";
import avartar2 from "../../../../../assests/images/avartar-2.jpeg";

function Story(props) {
  return (
    <div className="story">
      <div className="story__header">
        <div className="story__header--line" />
        <h2 className="story__header--desc">A Little Story About Us</h2>
        <div className="story__header--line" />
      </div>
      <h2 className="story__title">Our History</h2>
      <p className="story__qout">“</p>
      <p className="story__desc">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. <br />
        All the Lorem Ipsum generators on the Internet tend to repeat predefined
        chunks as <br />
        necessary, making this the first true generator on the Internet.
      </p>
      <div className="story__images">
        <img src={avartar1} alt={avartar1} className="story__images--image" />
        <img src={avartar2} alt={avartar2} className="story__images--image" />
      </div>
      <p className="story__name">
        NGOC HOANG and THONG SEO - <span>Web design</span>
      </p>
    </div>
  );
}

export default Story;
