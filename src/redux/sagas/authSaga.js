import { put, takeEvery, call } from "@redux-saga/core/effects";
import axios from "axios";
import { LOGIN_START } from "../actions-constants/auth-constant";
import actions from "../actions/index";
import url from "../../urlApi"


const { authActions } = actions;
const { loginSc, loginEr } = authActions;

function* authSaga() {
  yield takeEvery(LOGIN_START, startLogin);
}

function* startLogin(data) {
  const { payload: { email, password } } = data || {};
  try {
    // yield put(loginStart(res.data));
    let res = yield call(login, { email, password });
    console.log('res', res)
    if (parseInt(res.status) === 200) {
      yield put(loginSc(res.data));
    }
  } catch (error) {
    console.log(`error message--->`, error.response.data.message);
    yield put(loginEr(error.response.data.message));
  }
}

function login(data) {
  return axios.post(`${url}login`, data)
}

export default authSaga;
