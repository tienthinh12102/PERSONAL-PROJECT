import { GET_RELATED_PRODUCTS } from "../actions-constants/relatedProduct"

export const getRelatedProducts = (data) => {
  return {
    type: GET_RELATED_PRODUCTS,
    payload: data,
  }
}
