import '@/styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { default as productSlice } from '@/Reducer/productReducer'
import localStorageMiddleware from '@/MiddleWare/Middelware'
import { combineReducers } from '@reduxjs/toolkit'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

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
  const data = JSON.parse(localStorage.getItem("productData"));
  if (data === null) {
    return undefined
  }
  return data
}
const rootReducer = combineReducers({
  productDetails: productSlice,
});

const store = configureStore({
  reducer: rootReducer,
  // reducer: {
  //   productDetails: productSlice.reducer
  // },
  middleware: (getData) => {
    // console.log(getData());
    return getData().concat(localStorageMiddleware)
  },
  preloadedState: preloadState(),
});

export default function App({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ToastContainer />
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  </>
}
