import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
    query  {
        getAllUsers {
        _id
        email
        name
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
// export const getProductList = () => {
//     const { data, error, loading } = useQuery(GET_ALL_PRODUCTS)
//     return {
//         data,
//         error,
//         loading
//     }
// }