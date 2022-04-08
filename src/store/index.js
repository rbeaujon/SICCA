import { createStore } from 'redux';
import { combineReducers } from "redux";
import  SiccaReducer from './sicca/sicca.reducer';


const reducers = combineReducers ({
  SiccaReducer
})

const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());    

export default store;

 
