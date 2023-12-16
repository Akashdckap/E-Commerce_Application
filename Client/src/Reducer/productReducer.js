import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
    },
    reducers: {
        storeAddToCartProductData: (state, action) => {
            const productData = action.payload;
            const findProduct = state.cartData.find((product) => product._id === productData._id);
            if (findProduct) {
                findProduct.count += 1;
            } else {
                state.cartData.push({ ...productData, count: 1 });
            }
        },

        removeCartdata: (state, action) => {
            const itemId = action.payload
            state.cartData = state.cartData.filter(cart => cart._id !== itemId)
        },
        incrementProductCount: (state, action) => {
            const { productId } = action.payload;
            const productIndex = state.cartData.findIndex(product => product._id === productId)
            state.cartData[productIndex].count = (state.cartData[productIndex].count || 0) + 1;
            // const { productId } = action.payload;
            // const existingProduct = state.cartData.find(product => product._id === productId);

            // if (existingProduct) {
            //     existingProduct.count += 1;
            //     existingProduct.price = existingProduct.originalPrice * existingProduct.count;
            // } else {
            //     const { productId, UpdatePrice } = action.payload;
            //     state.cartData.push({ productId, count: 1, price: originalPrice, originalPrice });
            // }
        },
        decrementProductCount: (state, action) => {
            const { productId } = action.payload
            const productIndex = state.cartData.findIndex(product => product._id === productId)
            state.cartData[productIndex].count = Math.max((state.cartData[productIndex].count || 0) - 1, 1);
        },
        removeAllCartDatas: (state) => {
            state.cartData = state.cartData = []
        },
        // updateCartItemQuantity: (state, action) => {
        //     console.log("updateCartItemQuantity", action.payload);
        // }
    },
})

export const { storeAddToCartProductData, updateCartItemQuantity, removeCartdata, removeAllCartDatas, incrementProductCount, decrementProductCount } = productSlice.actions
export default productSlice.reducer