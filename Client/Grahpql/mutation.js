import { useQuery, gql, useMutation } from "@apollo/client";

export const CREATE_ADMINS = gql`
  mutation createAdmins($adminsInput: adminsInput!) {
    createAdmins(adminsInput: $adminsInput) {
      name
      email
      phoneNo
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
  mutation cartItems($userId:ID!, $productId: ID!, $productCart: cartItemsInput!){
    cartItems(userId: $userId, productId: $productId, productCart: $productCart){
      productID
      productName
      category
      brand
      price
      weight
      color
      description
      quantity
      expandedPrice
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
      quantity
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
  mutation addCustomerShippingAddress($id:ID!, $input: shippingAddressCustomerInput!){
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
export const UPDATE_CUSTOMER_SHIPPING_ADDRESS = gql`
  mutation updateCustomerShippingAddress($userId:ID! , $addressId: ID!, $input:shippingAddressInput!){
    updateCustomerShippingAddress(userId: $userId, addressId: $addressId, input:$input ){
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

export const DELETE_CUSTOMER_CART_DATA = gql`
   mutation deleteCustomerCartData($cartId: ID! $userId: ID!) {
      deleteCustomerCartData(cartId: $cartId userId: $userId)
}
`
export const DELETE_CUSTOMER_ADDRESS = gql`
  mutation deleteCustomerAddress($userId:ID! $addressId: ID!){
    deleteCustomerAddress(userId: $userId addressId: $addressId)
  }
`

export const REMOVE_ALL_CUSTOMER_CART_DATA = gql`
   mutation deleteAllCustomerCartData($userId: ID!) {
    deleteAllCustomerCartData(userId: $userId)
}
`
export const INCREMENT_CUSTOMER_PRODUCT_QTY = gql`
   mutation incrementCustomerProductQty($productId: ID! $userId: ID!) {
    incrementCustomerProductQty(productId: $productId userId: $userId){
      productName
      productID
      description
      category
      brand
      color
      weight
      price
      quantity
      expandedPrice
    }
}
`
export const DECREMENT_CUSTOMER_PRODUCT_QTY = gql`
   mutation decrementCustomerProductQty($productId: ID! $userId: ID!) {
    decrementCustomerProductQty(productId: $productId userId: $userId){
      productName
      productID
      description
      category
      brand
      color
      weight
      price
      quantity
      expandedPrice
    }
}
`