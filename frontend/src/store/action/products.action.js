import axios from 'axios';
import {ADD_PRODUCT_SUCCESS, DELETE_PRODUCTS_SUCCESS, FETCH_ALL_PRODUCTS_SUCCESS} from "./action.types";
export const fetchProducts = () => async dispatch => {
    try {
        const res = await axios.get('/api/server.php');
        dispatch({
            type: FETCH_ALL_PRODUCTS_SUCCESS,
            products: res.data
        })
    } catch (e) {
        console.log(e);
    }
}

export const deleteProducts = deletedIds => async dispatch => {
    try {
        const body = {
            deletedIds
        };
        const res = await axios.post('/api/delete.php', body);
        dispatch({
            type: DELETE_PRODUCTS_SUCCESS,
            ids: res.data
        });
    }catch (e) {
        console.log(e);
    }
}

export const addProduct = data => async dispatch => {
    try {
        const body = {
            ...data
        };

        const res = await axios.post('/api/server.php', body);
        console.log(res.data);
        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            product: res.data
        });
        return res.status;
    } catch (e) {
        console.log(e);
        return e.response.status;
    }
}