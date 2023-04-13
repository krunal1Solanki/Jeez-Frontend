import { INITIAL_STORE } from "./Store";
import { FETCH_PRODUCTS, FETCH_MYCART, ADD_TO_CART} from "./Actions";
export const reducer = (state = INITIAL_STORE, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS: 
            const newProducts = [...state.products, ...action.data];
            return {...state, products: newProducts};
        case FETCH_MYCART:     
            const newCart = action.data;
            return {...state, myCart : newCart};
        case ADD_TO_CART:
            return state;    
        default:
            return state;
    }
}
