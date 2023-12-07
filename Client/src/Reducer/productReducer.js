import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {},
    reducers: {
        addToCartProductData: (state, action) => {
            state.initialState = action.payload
        }
    }
})

export const { addToCartProductData } = productSlice.actions
export default productSlice.reducer