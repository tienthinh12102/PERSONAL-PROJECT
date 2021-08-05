import { ADD_PRODUCT_TO_CART, DECREASE_PRODUCT_TO_CART, DELETE_PRODUCT_IN_CART } from '../actions-constants/cart-constant';

const stateDefault = { data: [] };

const increaseQuantity = (product, cart) => {
  const newCart = [...cart];
  const productIndex = newCart.findIndex(item => item.id === product.id);
  console.log(productIndex)
  if (productIndex > -1) {
    newCart[productIndex].quantity += product.quantity;
  } else {
    newCart.push(product)
  }
  return newCart;
}

const decreaseQuantity = (product, cart) => {
  const newCart = [...cart];
  const productIndex = newCart.findIndex(item => item.id === product.id);
  if (productIndex > -1) {
    newCart[productIndex].quantity -= product.quantity;
    if (newCart[productIndex].quantity < 0) {
      newCart[productIndex].quantity = 0;
    }
  }
  return newCart;
}

const deleteItemCart = (product, cart) => {
  const newCart = [...cart];
  const itemIndex = newCart.findIndex(item => item.id === product.id)
  newCart.splice(itemIndex, 1);
  return newCart;
}

const CartReducer = (state = stateDefault, action) => {
  switch (action.type) {

    case ADD_PRODUCT_TO_CART:
      console.log(action.payload)

      const increaseCart = increaseQuantity(action.payload, state.data);
      return { ...state, data: increaseCart };

    case DECREASE_PRODUCT_TO_CART:
      const decreaseCart = decreaseQuantity(action.payload, state.data);
      return { ...state, data: decreaseCart };

    case DELETE_PRODUCT_IN_CART:
      const deleteCart = deleteItemCart(action.payload, state.data);
      return { ...state, data: deleteCart };

    default:
      return state;
  }
};

export default CartReducer;
