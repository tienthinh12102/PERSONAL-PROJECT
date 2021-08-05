import { Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../../../../../redux/actions/cartAction";
import ModalProductDetails from "../../../../Header/Modal/productDetails/ModalProductDetails";
import "./style.scss";

ItemProduct.propTypes = {
  products: PropTypes.array,
}

ItemProduct.defaultProps = {
  products: [],
}

function ItemProduct(props) {
  const { products, onRedirectDetail } = props;
  const dispatch = useDispatch();

  const [selectProduct, setSelectProduct] = useState(null);

  function increaseQuantity(product) {
    return {
      ...product,
      quantity: 1,
    }
  }

  function handleAddTocart(product) {
    const increaseProduct = increaseQuantity(product);

    dispatch(addProductToCart(increaseProduct))
  }

  const setSelectItem = (product) => {
    setSelectProduct(product)
  }

  const handleResetItem = () => {
    setSelectProduct(null)
  }

  const element = products.map(product => (
    <React.Fragment key={product.id}>
      <Grid item lg={3} md={4} sm={6} xs={12} className="products__main">
        <div className="products__main--overlay">
          <ul className="products__main--overlay--action">
            <li>
              <i className="fa fa-eye" onClick={() => setSelectItem(product)} data-toggle="modal" data-target="#exampleModalCenter" />
            </li>
            <li>
              <i className="fa fa-heart-o" />
            </li>
            <li>
              <i className="fa fa-shopping-basket" onClick={() => handleAddTocart(product)} />
            </li>
          </ul>
        </div>
        <div className="products__main--main" onClick={() => onRedirectDetail(product)}>
          <div className="price-discount">
            <p>-{product.sale * 100}%</p>
          </div>
          <img src={product.bigPicture} alt={product.bigPicture} />
          <p>{product.name}</p>
          <div className="products__main--main--group">
            <p>{product.price}$</p>
            <p>{product.price - (product.price * product.sale)}$</p>
            <Rating
              name="simple-controlled"
              value={product.rating}
              readOnly
              id="rating"
            />
          </div>
        </div>
        {selectProduct && <ModalProductDetails product={selectProduct} onResetSelectItem={handleResetItem} />}
      </Grid>
    </React.Fragment>
  ))

  return (
    <Grid container spacing={3} alignContent="space-around" id="grid-products">
      {element}
    </Grid>
  );
}

export default ItemProduct;
