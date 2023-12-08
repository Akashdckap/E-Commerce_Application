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
            const itemId = action.payload
            state.cartData = state.cartData.filter(cart => cart._id !== itemId)
        },
        incrementProductCount: (state, action) => {
            console.log(action.payload);
            console.log(state.cartData);
            state.cartData[action.payload] = (state.cartData[action.payload] || 0) + 1;

            //    const dataaas =  state.cartData.map(get => get._id === action.payload)
            //    console.log(dataaas);
            // state.cartData
            // const { id } = action.payload
            // state.cartData[_id] = (state.cartData[_id] || 0) + 1
        },
        // decrementProductCount: (state, action) => {

        // }
    },
})

export const { addToCartProductData, removeCartdata, incrementProductCount } = productSlice.actions
export default productSlice.reducer