import { call, put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";
import { GET_PRODUCTS, DELETE_PRODUCTS_START, GET_ITEM_PRODUCT_START, EDIT_ITEM_PRODUCT_START } from "../actions-constants/products-constant";
import url from "../../urlApi";
import actions from "../actions/index";


const { productActions } = actions;
const { getProductsSc, getProductsEr, setDisplay, deleteProductsSuccess, deleteProductsError, getItemProductSc, getItemProductEr, editItemProductSc, editItemProductEr } = productActions;

function* productSaga() {
    yield takeEvery(GET_PRODUCTS, fetchProduct);
    yield takeEvery(DELETE_PRODUCTS_START, deleteItemProducts);
    yield takeEvery(GET_ITEM_PRODUCT_START, fetchItemProducts);
    yield takeEvery(EDIT_ITEM_PRODUCT_START, editItemProducts);
}

// ----------get all product---------------------

function* fetchProduct() {
  try {
    let res = yield call(getAllproduct);
    yield put(setDisplay("none"));
    if (parseInt(res.status) === 200) {
      yield put(getProductsSc(res.data));
    }
  } catch (error) {
    console.error();
    yield put(getProductsEr(error));
  }
}

function getAllproduct() {
  return axios.get(`${url}products`)
}


// ----------delete item product---------------------

function* deleteItemProducts(action) {
    const { payload: productId } = action || {};
    console.log(`productId`, productId)
    try{
        let res = yield call(deleteProducts, {productId})
        console.log(res)
        if (parseInt(res.status) === 200) {
            yield put(deleteProductsSuccess(productId));
        }
    }catch (error) {
        console.log(`error message--->`, error);
        yield put(deleteProductsError(error));
    }
}

function deleteProducts({productId}) {
      return axios.delete(`${url}products/${productId}` )
}


// ----------get item product---------------------

function* fetchItemProducts(action) {
  const id = action.payload.id || {};
  console.log("action", id)
  try{
      let res = yield call(getItemProducts, {id})
      console.log(res)
      if (parseInt(res.status) === 200) {
          yield put(getItemProductSc(res.data));
      }
  }catch (error) {
      console.log(`error message--->`, error);
      yield put(getItemProductEr(error));
  }
}

function getItemProducts({id}) {
  return axios.get(`${url}products/${id}` )
}

// ----------edit item product---------------------

function* editItemProducts(action) {
  const data = action.payload || {};
  console.log("action", data)
  try{
      let res = yield call(editProducts, {data})
      console.log('res', res)
      if (parseInt(res.status) === 200) {
          yield put(editItemProductSc(res.data));
      }
  }catch (error) {
      console.log(`error message--->`, error);
      yield put(editItemProductEr(error));
  }
}

function editProducts({data}) {
  const {id, categoryId, BigPicture, Description, ProductsName, ProductsPrice, ProductsSale, ThumbnailUrl1, ThumbnailUrl2, ThumbnailUrl3, ThumbnailUrl4} = data || {};
  return axios
    .patch(`${url}products/${id}`, {
      categoryId: parseInt(categoryId),
      name: ProductsName,
      price: parseInt(ProductsPrice),
      sale: parseFloat(ProductsSale),
      bigPicture: BigPicture,
      thumbnailUrl: [
        ThumbnailUrl1,
        ThumbnailUrl2,
        ThumbnailUrl3,  
        ThumbnailUrl4,
      ],
      description: Description,
      rating: {},
    });
}


export default productSaga;
