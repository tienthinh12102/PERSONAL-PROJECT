import { Box, Grid } from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from "@material-ui/lab/Rating";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from '../../../../../../redux/actions/cartAction';
import ModalProductDetails from '../../../../Header/Modal/productDetails/ModalProductDetails';
import { toast } from 'react-toastify';

function ItemProducts({ product, onRedirectDetail }) {
  const { name, price, bigPicture, sale, rating } = product;
  const [selectProduct, setSelectProduct] = useState(null);
  const dispatch = useDispatch();
  let salePrice = price - price * sale;
  let percentSale = sale * 100;

  const setSelectItem = (product) => {
    setSelectProduct(product)
  }

  const handleResetItem = () => {
    setSelectProduct(null)
  }

  const increaseQuantity = (product) => {
    return {
      ...product,
      quantity: 1
    }
  }

  const handlerAddToCart = event => {
    event.stopPropagation();
    const increaseProduct = increaseQuantity(product)
    if(increaseProduct) {
      toast.success(`Add product to cart successfully!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch(addProductToCart(increaseProduct))
  }

  return (
    <Grid item lg={3} md={4} sm={6} xs={12} className="products__main">
      <div className="products__main--overlay" >
        <ul className="products__main--overlay--action">
          <li>
            <i onClick={() => setSelectItem(product)} className="fa fa-eye" data-toggle="modal" data-target="#exampleModalCenter" />
          </li>
          <li>
            <i className="fa fa-heart-o" />
          </li>
          <li>
            <i className="fa fa-shopping-basket" onClick={handlerAddToCart} />
          </li>
        </ul>
      </div>
      <div className="products__main--main" onClick={() => onRedirectDetail(product)}>
        <div className="price-discount">
          <p>-{percentSale}%</p>
        </div>
        <img src={bigPicture} alt={bigPicture} />
        <p>{name}</p>
        <div className="products__main--main--group">
          <p>{price}$</p>
          <p>{salePrice}$</p>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
              style={{ marginLeft: "1rem" }}
              name="customized-empty"
              defaultValue={rating}
              value={rating || 0}
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              size="small"
              readOnly
            />
          </Box>
        </div>
      </div>
      { selectProduct && <ModalProductDetails product={selectProduct} onResetSelectItem={handleResetItem} />}
    </Grid >
  );
}

export default ItemProducts;
