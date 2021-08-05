import { SET_DISPLAY, GET_PRODUCTS_SC, GET_PRODUCTS_ER, DELETE_PRODUCTS_START, DELETE_PRODUCTS_ERROR, DELETE_PRODUCTS_SUCCESS, GET_ITEM_PRODUCT_SUCCESS, GET_ITEM_PRODUCT_ERROR, EDIT_ITEM_PRODUCT_SUCCESS, EDIT_ITEM_PRODUCT_ERROR } from '../actions-constants/products-constant';

const stateDefault = { data: [], dataItem:[], errorMessage: null, display: "block", isLoading: false };

const ProductsReducer = (state = stateDefault, action) => {
  switch (action.type) {

// ----------------------get all product-------------------------------

    case SET_DISPLAY:

      return { ...state, display: action.payload };

    case GET_PRODUCTS_SC:
      return { ...state, data: action.payload, errorMessage: null }

    case GET_PRODUCTS_ER:

      action.payload = "There are currently no products !";

      return { ...state, data: [], errorMessage: action.payload };

// ----------------------delete all product-------------------------------

    case DELETE_PRODUCTS_START:

      return { ...state, isLoading: true };

    case DELETE_PRODUCTS_SUCCESS:

      const products = [...state.data];
      const afterDeleteProducts = products.filter(pro => pro.id !== action.payload)

      return { ...state, isLoading: false, data: afterDeleteProducts }

    case DELETE_PRODUCTS_ERROR:

      return { ...state, isLoading: false };

// ----------------------get item product-------------------------------
      
    case GET_ITEM_PRODUCT_SUCCESS:

      return { ...state, dataItem: action.payload, errorMessage: null }

    case GET_ITEM_PRODUCT_ERROR:

      return { ...state, errorMessage: action.payload };
  
// ----------------------edit item product-------------------------------

    case EDIT_ITEM_PRODUCT_SUCCESS:
      console.log(action.payload)
      const productArr = [...state.data]; // Mang chua update
      const editedProduct = action.payload; // Product tra ve sau khi da update
      const indexProduct = productArr.findIndex((item) => item.id === editedProduct.id); // Vi tri Product ma minh update trong mang cu
      productArr[indexProduct] = editedProduct; // Gan prod moi cho cu
      return { ...state, data: productArr, errorMessage: null }

    case EDIT_ITEM_PRODUCT_ERROR:

      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

export default ProductsReducer;
