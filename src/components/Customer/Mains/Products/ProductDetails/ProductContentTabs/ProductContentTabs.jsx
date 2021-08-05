import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DescriptionProducts from "./DescriptionProducts";
import ReviewProducts from "./ReviewProducts";
import axios from "axios";

const ProductContentTabs = (props) => {
  const [showDescription, setShowDescription] = useState(true);
  //get data related product
  const relatedProduct = useSelector(state => state.relatedProduts.relatedProducts);
  const { description, thumbnailUrl } = relatedProduct;

  const style = {
    cursor: "pointer",
  }

  return (
    <div className="productDetails__content--tabs">
      <div className="producDetails__tabs">
        <ul>
          <li onClick={() => setShowDescription(true)} style={style}>Description</li>
          <li onClick={() => setShowDescription(false)} style={style}>Reviews(2)</li>
        </ul>
      </div>
      <div className="productDetails__tabs--content">
        {showDescription && <DescriptionProducts description={description} thumbnailUrl={thumbnailUrl}></DescriptionProducts>}
        {!showDescription && <ReviewProducts relatedProduct={relatedProduct} />}
      </div>
    </div>
  );
};

export default ProductContentTabs;
