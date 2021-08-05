import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import relatedProductsReducer from './relatedProducts';

const rootReducer = combineReducers({
  products: ProductsReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  relatedProduts: relatedProductsReducer,
})

export default rootReducer;
