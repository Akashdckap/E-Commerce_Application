import { createSlice, nanoid } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
        shippingData: [],
        billingData: [],
        personalData: [],
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
        storeShippingAddress: (state, action) => {
            state.shippingData = action.payload
            // state.shippingData.push({ ...action.payload, id: nanoid() });
        },
        storeBillingAddress: (state, action) => {
            state.billingData = action.payload
            // state.billingData.push({ ...action.payload, id: nanoid() });
        },
        storePersonalDetails: (state, action) => {
            state.personalData = action.payload
            // state.personalData.push({ ...action.payload, id: nanoid() });
        },
        updatePersonalDetails: (state, action) => {
            state.personalData = { ...state.personalData, ...action.payload }
        },
        updateShippingAddress: (state, action) => {
            state.shippingData = { ...state.shippingData, ...action.payload }
        },
        updateBillingAddress: (state, action) => {
            state.billingData = { ...state.billingData, ...action.payload }
        }
    },
})

export const {
    storeAddToCartProductData,
    storeBillingAddress,
    storeShippingAddress,
    updateShippingAddress,
    removeCartdata,
    removeAllCartDatas,
    incrementProductCount,
    decrementProductCount,
    storePersonalDetails,
    updatePersonalDetails,
    updateBillingAddress
} = productSlice.actions
export default productSlice.reducer