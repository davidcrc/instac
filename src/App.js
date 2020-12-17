import React, { useState } from "react";
// import { Button } from 'semantic-ui-react'
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
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
      {/* Lo llamamos aqui para utilizarlo globalmente */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ApolloProvider>
  );
}

export default App;
