import { useQuery, gql, useMutation } from "@apollo/client";

export const CREATE_ADMINS = gql`
  mutation createAdmins($input: adminsInput!) {
    createAdmins(adminsInput: $input) {
      email
      password
    }
  }

`;

export const CREATE_PRODUCTS = gql`
 mutation createProducts($productDatas: productsInput!){
    createProducts(newProducts: $productDatas){
        image
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
