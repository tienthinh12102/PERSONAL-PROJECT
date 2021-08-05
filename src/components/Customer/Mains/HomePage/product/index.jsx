import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getProducts } from "../../../../../redux/actions/productAction";
import { getRelatedProducts } from "../../../../../redux/actions/relatedProduct";
import ItemProduct from "./ItemProduct";
import "./style.scss";

function Products() {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  // dispatch action getRelatedProducts;
  const dispatch = useDispatch();

  // get value related products;

  useEffect(() => {
    dispatch(getProducts());

    axios.get("http://localhost:5000/api/products")
      .then(res => {
        const topProducts = res.data.sort((a, b) => b.rating - a.rating).slice(0, 8);
        setProducts(topProducts);
      })
  }, []);

  const relatedProduct = useSelector(state => state.relatedProduts.relatedProducts);

  const redirectDetail = product => {
    const action = getRelatedProducts(product);
    dispatch(action);
    history.push(`/Products/${relatedProduct.id}`);
  }

  return (
    <div className="products">
      <ToastContainer />
      <div className="products__header">
        <div className="products__header--line" />
        <h2 className="products__header--desc">Perfect for growing plants</h2>
        <div className="products__header--line" />
      </div>
      <h2 className="products__title">Popular Products</h2>
      <ItemProduct products={products} onRedirectDetail={redirectDetail} />
    </div>
  );
}

export default Products;
