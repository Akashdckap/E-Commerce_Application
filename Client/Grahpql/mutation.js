import { useQuery, gql, useMutation } from "@apollo/client";

export const CREATE_ADMINS = gql`
  mutation createAdmins($input: adminsInput!) {
    createAdmins(adminsInput: $input) {
      email
      password
    }
  }
`;
