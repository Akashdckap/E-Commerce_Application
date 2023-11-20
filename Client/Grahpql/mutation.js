import { useQuery, gql, useMutation } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: usersInput!) {
    createUsers(usersInput: $input) {
      name
      email
      password
    }
  }
`;

export const CREATE_PRODUCTS = gql`#graphql
    mutation CreateProducts()
`


