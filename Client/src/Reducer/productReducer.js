import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productData",
    initialState: {},
    reducers: {
        addToCartProductData: (state, action) => {
            state.initialState = action.payload
            // console.log(action.payload);
        }
    }
})

export const { addToCartProductData } = productSlice.actions
export default productSlice.reducer