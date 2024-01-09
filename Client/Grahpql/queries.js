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
export const GET_CUSTOMER_REGISTER_DATA = gql`
       query getCustomerRegister($id: ID!) {
        getCustomerRegister (id: $id) {
        _id
        name
        email
        phoneNo
        Addresses{
            firstName
            lastName
            email
            phoneNo
            address
            district
            state
            pincode
            country
        }
     }
    }
`
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

export const GET_CART_ITEMS = gql`
query getAddToCart($userId: ID!){
    getAddToCart(userId:$userId){
        productName
        category
        brand
        price
        weight
        color
        description
    }
}`

export const GET_ORDER_PRODUCT_DETAILS = gql`
    query GetOrderProductDetails($id:ID!){
        getOrderProductDetails(id : $id){
            orderedProducts{
            productID,
            productName,
            description,
            category,
            brand,
            color,
            weight,
            price
            count,
            expandedPrice,
            }
            personalDetails{
            name,
            email,
            phoneNo,
            customerId,
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
            country,
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
            country,
            }
            totalPrice
        }
    }
`
export const ORDER_COUNT = gql`
    query getOrderCount{
        getOrderCount
    }
`

export const GET_ALL_ORDER_DATA_WITH_PAGE = gql`
    query getAllOrderDatas($page:Int!, $pageSize:Int!){
        getAllOrderDatas(page:$page,pageSize:$pageSize){
            _id
            orderedProducts{
            productID,
            productName,
            description,
            category,
            brand,
            color,
            weight,
            price
            count,
            expandedPrice,
            }
            personalDetails{
            name,
            email,
            phoneNo,
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
            country,
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
            country,
            }
            OrderTime,
            totalPrice
        }
    }
`
export const GET_REGISTER_CUSTOMER = gql`
    query {
        getCustomerRegister{
        name,
        email,
        password
      }
    }
`
export const GET_CUSTOMER_SHIPPING_ADDRESS = gql`
    query getShippingAddress($id:ID!) {
        getShippingAddress (id : $id){
            firstName,
            lastName,
            email,
            phoneNo,
            address,
            district,
            state,
            pincode,
            country,
      }
    }
`
export const GET_CUSTOMER_CART_DATA = gql`
      query getCustomerCartData($userId: ID!){
         getCustomerCartData(userId: $userId){
            _id,
            productId,
            productName,
            description,
            category,
            brand,
            color,
            weight,
            price
            quantity,
            expandedPrice,
    }
}

`