import {combineReducers} from "redux";
import productsReducer from "./products.reducer";

const initialState = {
    message: "hello there!"
}
const messageReducer = (state = initialState) => {
    return state;
}

export default () => combineReducers({
    message: messageReducer,
    products: productsReducer
});