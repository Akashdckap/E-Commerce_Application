import { createSlice, nanoid } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productDetails",
    initialState: {
        cartData: [],
        shippingData: [],
        billingData: []
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
            // state.shippingData = action.payload
            state.shippingData.push({ ...action.payload, id: nanoid() });
        },
        storeBillingAddress: (state, action) => {
            // state.billingData = action.payload
            state.billingData.push({ ...action.payload, id: nanoid() });
        }
        // updateShippingAddress: (state, action) => {
        //     const { name, value } = action.payload
        //     const fieldIndex = state.shippingData.find((field) => field.firstName === name);
        //     // console.log();
        //     // console.log("dataIndex------------------", dataIndex);
        //     // if (dataIndex) {
        //     //     state.shippingData[dataIndex].value = value
        //     //     // console.log("checking-------", state.shippingData[dataIndex].value);
        //     // }
        //     if (fieldIndex !== -1) {
        //         state.shippingData = [
        //           ...state.shippingData.slice(0, fieldIndex),
        //           { ...state.shippingData[fieldIndex], value },
        //           ...state.shippingData.slice(fieldIndex + 1),
        //         ];
        //       }
        //     console.log("name-----------", name);
        //     console.log("value-----------", value);
        // }
        // updateFormDataById: (state, action) => {
        //     const { id, updatedData } = action.payload;
        //     state.formDataArray = state.formDataArray.map(item =>
        //       item.id === id ? { ...item, ...updatedData } : item
        //     );
        //   },
        // updateCartItemQuantity: (state, action) => {
        //     console.log("updateCartItemQuantity", action.payload);
        // }
    },
})

export const {
    storeAddToCartProductData,
    storeBillingAddress,
    storeShippingAddress,
    updateShippingAddress,
    updateCartItemQuantity,
    removeCartdata,
    removeAllCartDatas,
    incrementProductCount,
    decrementProductCount
} = productSlice.actions
export default productSlice.reducer