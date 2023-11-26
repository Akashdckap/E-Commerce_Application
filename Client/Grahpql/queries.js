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

export const GET_ALL_PRODUCTS = gql`
    query {
        getAllProducts {
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
export const GET_ADD_TO_CART_SINGLE_PRODUCT_DATA = gql`
       query GetAddToCart_Single_ProductData ($id: ID!){
        getAddToCart_Single_ProductData (id : $id) {
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
