import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import createSagaMiddleware from "@redux-saga/core";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from "./sagas/index";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['products', 'order'] 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
let persistor = persistStore(store)
sagaMiddleware.run(rootSaga);
export default { store, persistor }
