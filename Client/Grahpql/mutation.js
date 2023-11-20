import { useQuery, gql, useMutation } from "@apollo/client";

export const CREATE_ADMIN = gql`
  mutation createAdmin($input: adminsInput!) {
    createAdmin(adminsInput: $input) {
      email
      password
    }
  }
`;


