import {createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {

    cart: [],
    orders: [],
    lang: 'GE'

}

export const functions = createSlice({

    name: 'localStore',
    initialState,
    reducers: {

        setTocart: (state, action) => {
            console.log(action.payload)
            const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex >= 0) {
                // If item already exists, update the quantity
                state.cart[existingItemIndex].count += action.payload.count;
            } else {
                // Otherwise, add the item to the cart
                state.cart.push(action.payload);
            }
        },

        updateQuantity: (state, action) => {
            const { id, count } = action.payload;
            const existingItemIndex = state.cart.findIndex(item => item.id === id);
            if (existingItemIndex >= 0) {
                state.cart[existingItemIndex].count = count;
            }
        },

        clearCart: (state) => {
            state.cart = [];
        },

        setLang: (state, action) => {
            state.lang = action.payload
            AsyncStorage.setItem('cashedLang', action.payload)
        },

        addOrder: (state, action) => {
            state.orders.push(action.payload);
        }
    }

})

export const {
    setTocart,
    setLang,
    addOrder,
    clearCart,
    updateQuantity

} = functions.actions


export const getFromCart = (state) => {
    return state.localStoreReducer.cart
}

export const getLang = (state) => {
    return state.localStoreReducer.lang
}

export const getOrders = (state) => {
    return state.localStoreReducer.orders
}
export default functions.reducer
