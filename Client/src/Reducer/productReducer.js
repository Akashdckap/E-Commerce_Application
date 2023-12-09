import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
    },
    reducers: {
        storeAddToCartProductData: (state, action) => {
            const productData = action.payload
            console.log("productData-----------------", productData);
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
            // if (productIndex !== -1) {
            state.cartData[productIndex].count = (state.cartData[productIndex].count || 0) + 1;
            // }
        },
        decrementProductCount: (state, action) => {
            const { productId } = action.payload
            console.log("productId-----------", productId);
            state.cartData.map(product => product._id === productId ? product.count - 1 : '')
            // const productIndex = state.cartData.findIndex(product => product._id === productId)

            // console.log("productIndex------------------", productIndex);
            // if (productIndex !== -1) {
            // state.cartData[productIndex].count = (state.cartData[productIndex].count || 0) - 1;
            // }
        }
    },
})

export const { storeAddToCartProductData, removeCartdata, incrementProductCount, decrementProductCount } = productSlice.actions
export default productSlice.reducer