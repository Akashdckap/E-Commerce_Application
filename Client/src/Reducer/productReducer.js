import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
    },
    reducers: {
        addToCartProductData: (state, action) => {
            const productData = action.payload


            // console.log(payload.getAddToCart_Single_ProductData[0]);
            // payload.forEach(item => {
            //     if (!state.cartData.some(item => item._id === item._id)) {
            //         state.cartData.push(payload)
            //     }
            // });
            // console.log("data----------------", data);
            // if (data) {
            //     console.log(data);
            //     console.log("data._id---------------", data);
            //     console.log("state.cartData", state.cartData);

            // }
            productData.forEach(element => {
                    if (!state.cartData.some(item => item._id === element._id)) {
                        state.cartData.push(element)
                    }

            });
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
            // console.log("productIndex------------------", productIndex);
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

export const { addToCartProductData, removeCartdata, incrementProductCount, decrementProductCount } = productSlice.actions
export default productSlice.reducer