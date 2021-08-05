import { ADD_ORDER, ADD_ORDER_SC, ADD_ORDER_ER, GET_ORDER, GET_ORDER_SC, GET_ORDER_ER } from '../actions-constants/order-constant';

const stateDefault = { data: null, isLoading: false, error: null };

const orderReducer = (state = stateDefault, action) => {
  switch (action.type) {

    case ADD_ORDER:
      return { ...state, isLoading: true, data: action.payload };

    case ADD_ORDER_SC:
      console.log(action.payload)
      return { ...state, isLoading: true, data: action.payload, error: null }

    case ADD_ORDER_ER:
      return { ...state, isLoading: false, data: [], error: action.payload };

      // ------------GET ORDER ---------------------

    case GET_ORDER:
        return { ...state, isLoading: true, data: action.payload };

    case GET_ORDER_SC:
      console.log(action.payload)
      return { ...state, isLoading: false, data: action.payload, error: action.payload };


    case GET_ORDER_ER:
      return { ...state, isLoading: false, data: [], error: action.payload };


    default:
      return state;
  }
};

export default orderReducer;
