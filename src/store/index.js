import { createStore } from 'redux';
import { combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import  SiccaReducer from './sicca/sicca.reducer';


const reducers = combineReducers ({
    SiccaReducer
})

const persistConfig = {
    key: 'root',
    storage
  }
   
const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());    
let persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export  { store, persistor }
 
