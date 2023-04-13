import { createStore } from "redux";
import { reducer } from "./Reducers";

export const INITIAL_STORE = {
    products: [],
    myCart: [],
};
  

export const store = createStore(reducer,INITIAL_STORE)