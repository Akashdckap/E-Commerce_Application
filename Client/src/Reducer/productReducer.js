import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
    },
    reducers: {
        addToCartProductData: (state, action) => {
            const { payload } = action
            if (!state.cartData.some(item => item._id === payload._id)) {
                state.cartData.push(payload)
            }
        },
        removeCartdata: (state, action) => {
            state.cartData = state.cartData.filter((cart) => cart._id !== action.payload)
        }
    },
})

export const { addToCartProductData,removeCartdata } = productSlice.actions
export default productSlice.reducer