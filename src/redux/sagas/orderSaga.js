import { put, takeEvery, call } from "@redux-saga/core/effects";
import axios from "axios";
import { ADD_ORDER, GET_ORDER } from "../actions-constants/order-constant";
import actions from "../actions/index";
import url from "../../urlApi"


const { orderActions } = actions;
const { addOrderSc, addOrderEr, getOrderSc, getOrderEr } = orderActions;

function* orderSaga() {
    yield takeEvery(ADD_ORDER, orderStart);
    yield takeEvery(GET_ORDER, fetchOrder);
}

function* orderStart(data) {
    console.log(data.payload)
    const {userId, fullname, deleveryAddress, orderNotes, phoneNumber, cart } = data.payload
    try {
        let res = yield call(order, {userId, fullname, deleveryAddress, orderNotes, phoneNumber, cart });
        console.log('res', res)
        if (parseInt(res.status) === 201) {
            yield put(addOrderSc(res.data));
        }
    } catch (error) {
        console.log(`error message--->`, error);
        yield put(addOrderEr(error));
    }
}

function order(data) {
    return axios.post(`${url}orders`, data)
}

// --------- get order-----------------

function* fetchOrder() {
    try {
        let res = yield call(getOrders);
        console.log(res)
        if (parseInt(res.status) === 200) {
            yield put(getOrderSc(res.data));
        }
    } catch (error) {
        console.error();
        yield put(getOrderEr(error));
    }
 }

function getOrders( ) {
    return axios.get(`${url}orders`)
}

export default orderSaga;
