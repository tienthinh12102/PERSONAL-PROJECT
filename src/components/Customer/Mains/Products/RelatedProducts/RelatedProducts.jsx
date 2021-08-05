import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProducts } from "../../../../../redux/actions/productAction";
import { getRelatedProducts } from "../../../../../redux/actions/relatedProduct";
import ItemProduct from "../../HomePage/product/ItemProduct";
import "../../HomePage/product/style.scss";

const RelatedProducts = () => {
  let style = {
    textAlign: "center",
    fontSize: "48px",
    fontWeight: "bold",
    color: "#241305",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const relatedProduct = useSelector(state => state.relatedProduts.relatedProducts);
  const getProductStore = useSelector(state => state.products.data);

  function getTopProducts() {
    const itemProducts = getProductStore.filter(product => {
      return product.categoryId === relatedProduct.categoryId;
    });

    const topProducts = itemProducts.sort((a, b) => b.rating - a.rating).slice(0, 8);
    return topProducts;
  }

  const [products, setProducts] = useState(() => {
    getTopProducts();
  });

  useEffect(() => {
    setProducts(getTopProducts());
  }, [getProductStore])

  const onRedirectDetail = product => {
    const action = getRelatedProducts(product);
    dispatch(action);
    history.push(`/Products/${relatedProduct.id}`);
  }

  useEffect(() => {
    const action = getProducts();
    dispatch(action);
  }, [])

  return (
    <div className="relatedProducts">
      <p style={style} className="relatedProducts__title">
        Related Products
      </p>
      <ItemProduct products={products} onRedirectDetail={onRedirectDetail}></ItemProduct>
    </div>
  );
};

export default RelatedProducts;
