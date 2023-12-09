import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
    },
    reducers: {
        storeAddToCartProductData: (state, action) => {
            const productData = action.payload
            if (productData) {
                productData.forEach(element => {
                    if (!state.cartData.some(item => item._id === element._id)) {
                        state.cartData.push(element)
                    }
                });
            }
        },
        removeCartdata: (state, action) => {
            const itemId = action.payload
            state.cartData = state.cartData.filter(cart => cart._id !== itemId)
        },
        incrementProductCount: (state, action) => {
            const { productId } = action.payload
            const productIndex = state.cartData.findIndex(product => product._id === productId)
            state.cartData[productIndex].count = (state.cartData[productIndex].count || 0) + 1;
        },
        decrementProductCount: (state, action) => {
            const { productId } = action.payload
            const productIndex = state.cartData.findIndex(product => product._id === productId)
            state.cartData[productIndex].count = Math.max((state.cartData[productIndex].count || 0) - 1, 0);
        },
        removeAllCartDatas: (state) => {
            state.cartData = []
        }
    },
})

export const { storeAddToCartProductData, removeCartdata, removeAllCartDatas, incrementProductCount, decrementProductCount } = productSlice.actions
export default productSlice.reducer