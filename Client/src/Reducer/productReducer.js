import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
    },
    reducers: {
        storeAddToCartProductData: (state, action) => {
            const productData = action.payload
            console.log("productData---------------", productData);
            if (productData) {
                productData.forEach(element => {
                    // console.log("element-------------", element._id);
                    const productIndex = state.cartData.some((product) => product._id === element._id);
                    // console.log("productIndex-----------", productIndex);
                    if (productIndex) {
                        state.cartData = state.cartData.map((product) =>
                            product._id === element._id ? { ...product, count: (product.count || 0) + 1 }
                                : product
                        );
                    }
                    else {
                        state.cartData.push({ ...element, count: 1 });
                    }
                });
            }
        },
        // storeAddToCartProductData: (state, action) => {
        //     const productData = action.payload
        //     console.log("productData---------------", productData);
        //     if (productData) {
        //         productData.forEach(element => {
        //             // if (!state.cartData.some(item => item._id === element._id)) {
        //             //     state.cartData.push(element)
        //             // }
        //             console.log("element-------------", element._id);
        //             const productIndex = state.cartData.find((product) => product._id === element._id);
        //             console.log("productIndex-----------", productIndex);
        //             // const productIndex = state.cartData.findIndex((product) => product._id === element._id)
        //             if (state.cartData[productIndex].count === undefined) {
        //                         state.cartData[productIndex].count =
        //                             (state.cartData[productIndex].count || 0) + 1;
        //             }
        //             // if (productIndex !== -1) {
        //             //     if (state.cartData[productIndex].count === undefined) {
        //             //         state.cartData[productIndex].count =
        //             //             (state.cartData[productIndex].count || 0) + 1;
        //             //     }
        //             // }

        //             // if (productIndex !== -1) {
        //             // if (state.cartData.some(item => item._id === element._id)) {
        //             // console.log("productIndex------------------", productIndex);
        //             // if (state.cartData.some(item => item._id === element._id) && state.cartData[productIndex].count !== undefined) {
        //             //     console.log("no");
        //             //     state.cartData[productIndex].count = (state.cartData[productIndex].count || 0) + 1;
        //             // } else {
        //             //     state.cartData[productIndex].count = 1;
        //             //     console.log("yes");
        //             // }
        //             // }
        //             // }
        //             console.log("productIndex--------------------", productIndex);
        //         });
        //     }
        // },

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