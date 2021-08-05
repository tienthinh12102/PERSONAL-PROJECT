import Rating from "@material-ui/lab/Rating";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from '../../../../../../redux/actions/cartAction';
import axios from 'axios';
import urlApi from '../../../../../../urlApi';
import { toast } from 'react-toastify';



const ProductContent = ({ product }) => {

  const dispatch = useDispatch()

  const { price, sale, description, name, categoryId } = product || {};

  const salePrice = price - (price * sale);

  const [countProductDetails, setCountProductDetails] = useState(0);
  const [category, setCategory] = useState(null);

  useEffect( () => {
    axios.get(`${urlApi}categories`)
          .then(function (response) {
            console.log(response.data)
            setCategory(response.data)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
  }, []);

  const getCategoryName = categoryId => {
    // get list categories => categories
    const newCategory = category || [] ;
    const cate = newCategory.find(item => item.id === categoryId);
    return (cate && cate.name) || '';
  }
  //get value related product

  function handlerClickMinus() {
    let newCountProductDetails = countProductDetails - 1;
    if (countProductDetails === 0) {
      newCountProductDetails = 0;
    }
    setCountProductDetails(newCountProductDetails);
  }

  function handlerClickPlus() {
    const newCountProductDetails = countProductDetails + 1;
    setCountProductDetails(newCountProductDetails);
  }

  const increaseQuantity = (product) => {
    console.log(countProductDetails)
    return {
      ...product,
      quantity: countProductDetails
    }
  }

  const handlerAddToCart = (product) => {
    const increaseProduct = increaseQuantity(product)
    console.log(increaseProduct.name)
    if(increaseProduct) {
      const name = increaseProduct.name;
      toast.success(`Add ${name} to cart successfully!`, {
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
    <div className="productDetails__content">
      <h1 className="productDetails__title">{name}</h1>
      <div className="productDetails__meta">
        <div className="productDetails__price">
          <div className="productDetails__price--cost">${price}</div>
          <div className="productDetails__price--sale">${salePrice}</div>
        </div>
        <div className="productDetails__rating">
          <Rating
            name="simple-controlled"
            value={5}
            id="rating"
          />
        </div>
      </div>
      <p className="productDetails__description">{description}</p>
      <div className="productDetails__action">
        <div className="productDetails__action--quantity">
          <div
            className="btn-group mr-2"
            role="group"
            aria-label="Second group"
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handlerClickMinus()}
            >
              -
            </button>
            <button disabled type="button" className="btn btn-light">
              {countProductDetails}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handlerClickPlus()}
            >
              +
            </button>
          </div>
        </div>
        <div className="productDetails__action--addToCart">
          <button onClick={() => handlerAddToCart(product)}>Add to cart</button>
        </div>
        <button className="productDetails__action--love">
          <i className="fa fa-heart-o" aria-hidden="true"></i>
        </button>
      </div>
      <div className="productDetails__attr">
        <p>
          <span>SKU:</span> PD 031
        </p>
        <p>
          <span>Categories:</span> {getCategoryName(categoryId)}
        </p>
        <p>
          <span>Tags:</span> Cactus, Flower, Indoor.
        </p>
      </div>
      <div className="productDetails__share">
        Share:
        <a href="facebook.com">
          <i className="fa fa-facebook" aria-hidden="true"></i>
        </a>
        <a href="twitter.com">
          <i className="fa fa-twitter" aria-hidden="true"></i>
        </a>
        <a href="instagram.com">
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default ProductContent;
