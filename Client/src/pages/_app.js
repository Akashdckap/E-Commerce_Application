import '@/styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

import { Provider } from 'react-redux'
import { productSlice } from '@/Reducer/productReducer'
import { localStorageMiddleware } from '@/MiddleWare/Middelware'
import { combineReducers } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

// import { createUploadLink } from 'apollo-upload-client'
// const client = new ApolloClient({
//   link: createUploadLink({
//     uri: 'http://localhost:4000/graphql',
//   }),
//   cache: new InMemoryCache()
// })

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
})
// const client = new ApolloClient({
//   link: createHttpLink({
//     uri: "http://localhost:5000/graphql"
//   }),
//   cache: new InMemoryCache()
// })



// export const preloadState = () => { return JSON.parse(localStorage.getItem("productData")) || {} }

export function preloadState() {
  if (typeof localStorage == 'undefined') {
    return undefined
  }
  return JSON.parse(localStorage.getItem("productData"));
}
// const reducer = combineReducers(productSlice)

// const store = configureStore({
//   reducer: reducer,
//   middleware: ((getData) => {
//     return getData().concat(localStorageMiddleware)
//   }),
//   preloadedState: preloadState(),
// });

export default function App({ Component, pageProps }) {
  return <>
    <ApolloProvider client={client}>
      {/* <Provider store={store}> */}
      <Component {...pageProps} />
      {/* </Provider> */}
    </ApolloProvider>
  </>
}
