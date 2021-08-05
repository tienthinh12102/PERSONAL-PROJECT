import { GET_RELATED_PRODUCTS } from "../actions-constants/relatedProduct"

const initState = {
  relatedProducts: [],
}

const relatedProductsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_RELATED_PRODUCTS:
      return {
        ...state,
        relatedProducts: action.payload
      }
    default:
      return state;
  }
}

export default relatedProductsReducer;
