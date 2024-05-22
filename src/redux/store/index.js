import { createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from 'redux-persist';
import { thunk } from "redux-thunk"
import reducers from "../reducers"
import AsyncStorage from '@react-native-async-storage/async-storage';

const middleware = [thunk];
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware)
)


export const persistor = persistStore(store);
