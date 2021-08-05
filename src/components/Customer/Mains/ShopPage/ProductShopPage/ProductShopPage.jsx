import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { getProducts } from "../../../../../redux/actions/productAction";
import { getRelatedProducts } from "../../../../../redux/actions/relatedProduct";
import Pagination from '../../ShopPage/Pagination/Pagination';
import ItemProducts from "./ItemProducts/ItemProducts";

const ProductShopPage = (props) => {
  const { findCategory, sortPrice } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const dataProducts = useSelector((state) => state.products.data);
  const errorDataProducts = useSelector((state) => state.products.errorMessage);
  const display = useSelector((state) => state.products.display);

  //current page
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage,] = useState(12);

  //pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


  const findProduct = dataProducts.filter(product => {
    return product.categoryId == findCategory;
  });

  let currentProducts = findCategory === "all" ? dataProducts.slice(indexOfFirstProduct, indexOfLastProduct) : findProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  currentProducts = sortPrice === "all" ? currentProducts : sortPrice === "asc"
    ? currentProducts.sort((a, b) => {
      if (a.price - (a.price * a.sale) < b.price - (b.price * b.sale)) return -1;
      if (a.price - (a.price * a.sale) > b.price - (b.price * b.sale)) return 1;
      return 0;
    })
    : sortPrice === "desc" ? currentProducts.sort((b, a) => {
      if (a.price - (a.price * a.sale) < b.price - (b.price * b.sale)) return -1;
      if (a.price - (a.price * a.sale) > b.price - (b.price * b.sale)) return 1;
      return 0;
    }) : ""

  useEffect(() => {
    setCurrentPage(1);
  }, [findCategory])

  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const relatedProduct = useSelector(state => state.relatedProduts.relatedProducts);

  const redirectDetail = product => {
    const action = getRelatedProducts(product);
    dispatch(action);
    history.push(`/Products/${relatedProduct.id}`);
  }
  // count duplicate rating products id

  const data = currentProducts.map((product, index) => {
    return <ItemProducts key={index} product={product} onRedirectDetail={redirectDetail} sortPrice={sortPrice} findCategory={findCategory} />;
  });

  let style = {
    textAlign: "center",
    width: "100%",
    fontSize: "2rem",
    color: "rgb(138, 138, 138)",
  };

  function onHandleBeforePage(number) {
    setCurrentPage(currentPage - number);
  }

  function onHandleAfterPage(number) {
    setCurrentPage(currentPage + number);
  }

  return (
    <>
      <ToastContainer />
      <div>
        <Grid
          container
          spacing={3}
          alignContent="space-around"
          id="grid-products"
        >
          {data}
          <p style={style}>{errorDataProducts}</p>
        </Grid>
      </div>
      <div style={{ display: display }} className="spinner-border text-success" role="status">
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={findCategory === "all" ? dataProducts.length : findProduct.length}
        paginate={paginate}
        currentPage={currentPage}
        onHandleBeforePage={onHandleBeforePage}
        onHandleAfterPage={onHandleAfterPage}
      />
    </>
  );
};

export default ProductShopPage;
