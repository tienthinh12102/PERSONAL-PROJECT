import React from "react";
import Banner from "./Banner/Banner";
import Category from "./Categories";
import Story from "./Story/Story";
import Plants from "./Plants/Plants";
import Products from "./product";
import Instagram from "../Products/Instagram/Instagram";
import Headers from '../../Header/Headers';
import Footer from '../../Footer/Footer'

const HomePage = () => {
  return (
    <div>
      <Headers />
      <Banner />
      <Category />
      <Story />
      <Plants />
      <Products />
      <Instagram></Instagram>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
