import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
    },
    reducers: {
        storeAddToCartProductData: (state, action) => {
            const productData = action.payload
            // console.log("productData---------------", productData);
            if (productData) {
                productData.forEach(element => {
                    if (!state.cartData.some(item => item._id === element._id)) {
                        state.cartData.push(element)
                    }
                    const productIndex = state.cartData.findIndex(product => product._id === element._id)
                    if (productIndex !== -1) {
                        if (state.cartData.some(item => item._id === element._id)) {
                            if (state.cartData[productIndex].count === undefined) {
                                console.log("no");
                                state.cartData[productIndex].count = (state.cartData[productIndex].count || 0) + 1;
                            } else {
                                console.log("yes");
                                state.cartData[productIndex].count = 1;
                            }
                        }
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
            state.cartData[productIndex].count = Math.max((state.cartData[productIndex].count || 0) - 1, 1);
        },
        removeAllCartDatas: (state) => {
            state.cartData = state.cartData = []
        }
    },
})

export const { storeAddToCartProductData, removeCartdata, removeAllCartDatas, incrementProductCount, decrementProductCount } = productSlice.actions
export default productSlice.reducer