import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getRelatedProducts } from "../../../../redux/actions/relatedProduct.js";
import Pagination from "../../../Customer/Mains/ShopPage/Pagination/Pagination.jsx";
import ItemProduct from "../../Mains/HomePage/product/ItemProduct";
import NoResult from "./NoResult/index.jsx";
import "./style.scss";

ProductsSearch.propTypes = {
  searchTerm: PropTypes.string,
  products: PropTypes.array,
}

ProductsSearch.defaultProps = {
  products: [],
}

function ProductsSearch(props) {
  const { searchTerm, products } = props;

  //current page
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage,] = useState(8);

  //pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const dispatch = useDispatch();
  const history = useHistory();

  const redirectDetail = product => {
    const action = getRelatedProducts(product);
    dispatch(action);
    history.push(`/Products/${product.id}`);
  }

  const element = products.length === 0 ? <NoResult /> : <ItemProduct products={currentProducts} onRedirectDetail={redirectDetail} />

  function onHandleBeforePage(number) {
    setCurrentPage(currentPage - number);
  }

  function onHandleAfterPage(number) {
    setCurrentPage(currentPage + number);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="products-search" id={searchTerm === "" ? "" : "show"}>
      <Grid container spacing={3} alignContent="space-around" id="grid-products">
        {element}
      </Grid>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
        onHandleBeforePage={onHandleBeforePage}
        onHandleAfterPage={onHandleAfterPage}
      />
    </div>
  )
}

export default ProductsSearch;
