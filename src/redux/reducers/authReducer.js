import { LOGIN_START, LOGIN_SC, LOGIN_ER, LOGOUT } from '../actions-constants/auth-constant';

const stateDefault = { data: null, isLoading: false, error: null };

const AuthReducer = (state = stateDefault, action) => {
  switch (action.type) {

    case LOGIN_START:

      return { ...state, isLoading: true, data: action.payload, error: null };

    case LOGIN_SC:

      return { ...state, isLoading: true, data: action.payload, error: null }

    case LOGIN_ER:

      return { ...state, isLoading: false, data: [], error: action.payload };

    case LOGOUT:

      return { ...state, data: null, error: null };

    default:
      return state;
  }
};

export default AuthReducer;
