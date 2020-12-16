import React, { useState } from "react";
import { Button } from 'semantic-ui-react'
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import Auth from "./pages/Auth";

function App() {
  // const [auth, setAuth] = useState({name: "DAvid"})  // Con un login activo
  const [auth, setAuth] = useState(undefined)         // Significa si estado o sin loguin

  return (
    <ApolloProvider client={client} >

      {
        !auth ? <Auth/> : <h1>Estas logueado</h1>
      }
    </ApolloProvider>
  );
}

export default App;
