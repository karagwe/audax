import React from 'react';
import ReactDOM from 'react-dom/client';
import  {ChakraProvider} from '@chakra-ui/react'
import App from './App';
import {MoralisProvider} from 'react-moralis'
import {ApolloProvider} from '@apollo/client'
import {apolloClient} from './graphql/Authentication/apoloClient'
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <MoralisProvider appId={process.env.REACT_APP_MORALIS_APP_ID} serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}>
        <ApolloProvider client={apolloClient}>
         <App />
         </ApolloProvider>
    </MoralisProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

