import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addProductToCart, decreaseProductToCart, deleteProductInCart } from '../../../../../redux/actions/cartAction';
import ConfirmationDialog from '../../../../common/ConfirmationDialog/ConfirmationDialog'

const ItemCart = ({ product }) => {

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const dispatch = useDispatch()

  const { name, price, sale, quantity, bigPicture } = product;

  const salePrice = price - (price * sale);

  const totalProduct = quantity * salePrice;

  const increaseQuantity = (product) => {
    return {
      ...product,
      quantity: 1
    }
  }

  const handlerAddToCart = (product) => {

    const increaseProduct = increaseQuantity(product)
    dispatch(addProductToCart(increaseProduct))
  }

  const handlerDecreaseProductToCart = (product) => {
    const increaseProduct = increaseQuantity(product)
    dispatch(decreaseProductToCart(increaseProduct))
  }

  const handlerDeleteProductInCart = (product) => {
    dispatch(deleteProductInCart(product))
  }

  const openConfirmModal = (product) => {
    setOpenConfirm(true);
    setSelectedProductId(product.id)

  }

  const closeConfirm = () => {
    setOpenConfirm(false);
  }

  const handleDelete = () => {
    dispatch(deleteProductInCart(selectedProductId))
    closeConfirm();
  }

  let style = {
    verticalAlign: 'baseline',
  }

  return (
    <tr className="shoppingcart__item">
      <ToastContainer />
      <th style={style} className="shoppingcart__item--product">
        <button onClick={() => openConfirmModal(product)}>x</button>
        <img
          alt={bigPicture}
          src={bigPicture}
        />
        <span>{name}</span>
      </th>
      <td style={style} className="shoppingcart__item--price">${salePrice}</td>
      <td style={style}>
        <div
          className="btn-group mr-2 shoppingcart__item--quantity"
          role="group"
        >
          <button className="btn btn-light" onClick={() => handlerDecreaseProductToCart(product)} >-</button>
          <button disabled className="btn btn-light">
            {quantity}
          </button>
          <button className="btn btn-light" onClick={() => handlerAddToCart(product)}>+</button>
        </div>
      </td>
      <td style={style} className="shoppingcart__item--total">${totalProduct}</td>
      <ConfirmationDialog open={openConfirm} onClose={closeConfirm} onOk={handleDelete} title={'product'} />
    </tr >
  );
};


export default ItemCart;
