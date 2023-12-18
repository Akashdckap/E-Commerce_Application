import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
    query  {
        getAllUsers {
        _id
        email
        password
    }
}
`
export const useUserList = () => {
    const { error, data, loading } = useQuery(GET_USERS)
    return {
        error,
        data,
        loading
    }
}

export const GET_ALL_PRODUCTS_DATA = gql`
    query {
        getAllProductsData {
            _id
            productName
            category
            brand
            price
            weight
            color
            description
        }
    }
`

export const GET_ALL_PRODUCTS = gql`
    query getAllProducts($page:Int!, $pageSize:Int!){
        getAllProducts(page:$page,pageSize:$pageSize){
             _id
             productName
             category
             brand
             price
             weight
             color
             description
        }
    }
`

export const GET_TOTAL_PRODUCT_COUNT = gql`
    query GetTotalProductCount{
        getTotalProductCount
    }
`
export const GET_EDIT_PRODUCT_DATA = gql`
    query GetEditProductData ($id: ID!){
        getEditProductData (id : $id) {
        _id
        productName
        category
        brand
        price
        weight
        color
        description
    }
    }
`
// export const GET_ADD_TO_CART_SINGLE_PRODUCT_DATA = gql`
//        query addToCartProductData ($ids: [ID!]!){
//         addToCartProductData (ids : $ids) {
//         _id
//         productName
//         category
//         brand
//         price
//         weight
//         color
//         description
//      }
//     }
// `
export const GET_ADD_TO_CART_SINGLE_PRODUCT_DATA = gql`
       query addToCartProductData ($ids: ID!){
        addToCartProductData (ids : $ids) {
        _id
        productName
        category
        brand
        price
        weight
        color
        description
     }
    }
`

export const GET_PRODUCT_DETAILS = gql`
    query GetProductDetails ($id:ID!){
        getProductDetails(id : $id){
            _id
            productName
            category
            brand
            price
            weight
            color
            description
        }
    }
`
export const ALL_ORDERED_PRODUCTS = gql`
    query {
        getAllOrders{
            orderedProducts{
            productName,
            category,
            brand,
            color,
            quantity,
            price
            }
            personalDetails{
            name
            email
            phoneNo
            }
            shippingAddress{
            firstName,
            lastName,
            email,
            phoneNo,
            address,
            district,
            state,
            pincode,
            country
            }
            billingAddress{
            firstName,
            lastName,
            email,
            phoneNo,
            address,
            district,
            state,
            pincode,
            country
            }
        }
    }
`