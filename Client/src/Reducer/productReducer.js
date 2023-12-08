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
        // setSelectedProductId: (state, action) => {
        //     const ids = state.selectedProductId = action.payload;
        //     state.cartData[ids] = (state.cartData[ids] || 0) + 1;
        // },
        incrementProductCount: (state, action) => {
            const { productId } = action.payload
            const productIndex = state.cartData.findIndex(product => product._id === productId)
            if (productIndex !== -1) {
                state.cartData[productIndex].count = (state.cartData[productIndex].count || 0) + 1;
            }
        }
        // state.cartData[productId] = (state.cartData[productId] || 0) + 1;
        // incrementProductCount: (state, action) => {
        // console.log(action.payload);
        // console.log(state.cartData);
        // const qty = action.payload
        // state.cartData[qty] = (state.cartData[qty] || 0) + 1;

        //    const dataaas =  state.cartData.map(get => get._id === action.payload)
        //    console.log(dataaas);
        // state.cartData
        // const { id } = action.payload
        // state.cartData[_id] = (state.cartData[_id] || 0) + 1
        // },
        // decrementProductCount: (state, action) => {

        // }
    },
})

export const { addToCartProductData, removeCartdata, incrementProductCount } = productSlice.actions
export default productSlice.reducer