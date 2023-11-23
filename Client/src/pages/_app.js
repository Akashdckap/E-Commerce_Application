import '@/styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
// import { createUploadLink } from 'apollo-upload-client'
// const client = new ApolloClient({
//   link: createUploadLink({
//     uri: 'http://localhost:4000/graphql',
//   }),
//   cache: new InMemoryCache()
// })

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache
// })
const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:5000/graphql"
  }),
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }) {
  return <>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </>
}
