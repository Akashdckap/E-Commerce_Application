import { useQuery, gql, useMutation } from "@apollo/client";

export const CREATE_ADMINS = gql`
  mutation createAdmins($input: adminsInput!) {
    createAdmins(adminsInput: $input) {
      email
      password
    }
  }
`;

export const LOGIN_CUSTOMER = gql`
  mutation customerLogin($loginInput: customerLoginInput){
    customerLogin(loginInput: $loginInput){
        email
        password
        token
    }
  }
`

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
export const CREATE_CART_ITEMS = gql`
  mutation cartItems($userId:ID!, $productCart: cartItemsInput!){
    cartItems(userId: $userId, productCart: $productCart){
      productId
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
  mutation createOrders($inputs: orderedInput!) {
  createOrders(inputs: $inputs) {
    orderedProducts {
      productName
      productID
      description
      category
      brand
      color
      weight
      price
      count
      expandedPrice
    }
    personalDetails {
      name
      email
      phoneNo
      customerId
    }
    shippingAddress {
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
    billingAddress {
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

export const CUSTOMER_REGISTER = gql`
   mutation registerCustomer($customerInput: customerRegisterInput!){
    registerCustomer(customerInput: $customerInput){
      name,
      email,
      phoneNo,
      password,
    }
   }
`
export const UPDATE_CUSTOMER_PERSONAL_DETAILS = gql`
  mutation updateCustomerPersonalDetails($id:ID!, $input: updateCustomerPersonal!){
    updateCustomerPersonalDetails(id: $id, input: $input){
      name,
      email,
      phoneNo,
    }
  }
`
export const ADD_CUSTOMER_SHIPPING_ADDRESS = gql`
  mutation addCustomerShippingAddress($id:ID!, $input: shippingAddressInput!){
    addCustomerShippingAddress(id: $id, input: $input){
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
`
export const UPDATA_CUSTOMER_SHIPPING_ADDRESS = gql`
  mutation updateCustomerShippingAddress($id:ID!, $input: shippingAddressInput!){
    updateCustomerShippingAddress(id: $id, input: $input){
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
`
