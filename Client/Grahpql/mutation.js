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
  mutation createProducts($input: productsInput!){
    createProducts(productsInput: $input){
      image,
      productName,
      category,
      brand,
      price,
      weight,
      description,
      color
    }
  }
`;