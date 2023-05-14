import * as actionTypes from '../action/action.types';

const initialState = {
    products: []
}

export default (state = initialState, action) => {
    const {type} = action;
    switch (type) {
        case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products
            }
        case actionTypes.DELETE_PRODUCTS_SUCCESS:
            const newProducts = state.products.filter(p => !action.ids.includes(p.id));
            return (() => {
                return {
                    ...state,
                    products: [...JSON.parse(JSON.stringify(newProducts))]
                }
            })();
        case actionTypes.ADD_PRODUCT_SUCCESS:
            return (() => {
                // const lastItem = state.products[state.products.length - 1];
                // const newProduct = {
                //     ...action.product,
                //     id: lastItem ? lastItem.id + 1 : 0
                // };
                return {
                    ...state,
                    products: [...state.products, action.product]
                }
            })();
        default:
            return state;
    }
}