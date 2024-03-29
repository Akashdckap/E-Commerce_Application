import { createSlice, nanoid } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
        shippingData: [],
        billingData: [],
        personalData: [],
        LoginData: {},
    },
    reducers: {
        // storeAddToCartProductData: (state, action) => {
        //     const productData = action.payload;
        //     const findProduct = state.cartData.find((product) => product._id === productData._id);
        //     if (findProduct) {
        //         findProduct.count += 1;
        //         findProduct.expandedPrice = findProduct.price * findProduct.count
        //     } else {
        //         state.cartData.push({ ...productData, count: 1, expandedPrice: findProduct.price });
        //     }
        // },
        storeAddToCartProductData: (state, action) => {
            const productData = action.payload;
            const productIndex = state.cartData.findIndex((product) => product._id === productData._id);
            if (productIndex === -1) {
                state.cartData.push({ ...productData, quantity: 1, expandedPrice: productData.price });
            } else {
                state.cartData[productIndex].quantity = (state.cartData[productIndex].quantity || 0) + 1;
                state.cartData[productIndex].expandedPrice = (state.cartData[productIndex].price) * state.cartData[productIndex].quantity
            }
        },

        removeCartdata: (state, action) => {
            const itemId = action.payload
            state.cartData = state.cartData.filter(cart => cart._id !== itemId)
        },
        incrementProductCount: (state, action) => {
            const { productId } = action.payload;
            const productIndex = state.cartData.findIndex(product => product._id === productId)
            state.cartData[productIndex].quantity = (state.cartData[productIndex].quantity || 0) + 1;
            state.cartData[productIndex].expandedPrice = (state.cartData[productIndex].price) * state.cartData[productIndex].quantity
        },
        decrementProductCount: (state, action) => {
            const { productId } = action.payload
            const productIndex = state.cartData.findIndex(product => product._id === productId)
            state.cartData[productIndex].quantity = Math.max((state.cartData[productIndex].quantity || 0) - 1, 1);
            state.cartData[productIndex].expandedPrice = (state.cartData[productIndex].price) * state.cartData[productIndex].quantity
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
        },
        customerLoginData: (state, action) => {
            state.LoginData = action.payload
        },
        logOutCustomer: (state, action) => {
            state.LoginData = {}
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
    updateBillingAddress,
    customerLoginData,
    logOutCustomer
} = productSlice.actions
export default productSlice.reducer