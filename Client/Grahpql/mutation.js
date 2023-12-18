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

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
`
export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id:ID!, $input: updateProductInput!){
    updateProduct(id: $id, input: $input){
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

export const EDIT_PRODUCT = gql`
mutation editProduct($id: ID!){
  editProduct(id: $id)
}`

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!){
    uploadFile(file: $file){
      url
    }
  }
`

export const ORDER_PRODUCT = gql`
  mutation createOrders($input: input){
    createOrders(input: $input)
  }
`

