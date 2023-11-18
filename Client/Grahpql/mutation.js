import { useQuery, gql, useMutation } from "@apollo/client";

// const USER_LOGIN = gql`
//     mutation createUser($name: String!){
//         createUsers(name:$name){
//             id
//             name
//         }
//     }
// `
export const CREATE_USER = gql`
  mutation createUsers($name:String!,$email:String!,$password:String!) {
    createUsers(name:$name,email:$email,password:$password) {
      name
      email
      password
    }
  }
`;


// const CreateUserInput = {
//     id: ID!,
//     name: String!,
//     email: String!,
//     password: String!,
// }

// type mutation = {
//     createUser(input: CreateUserInput!): User!
// }   
// type User = {
//     id: ID!,
//     name: String!,
//     email: String!,
//     password: String!
// }

// const LOGIN_USERS = gql`
//     mutation CreateUsers {
//         createUsers {
//          _id
//          email
//          name
//          password
//     }
//   }
// `



