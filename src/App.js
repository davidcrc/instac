import React, { useState, useEffect, useMemo } from "react";
// import { Button } from 'semantic-ui-react'
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import client from "./config/apollo";
import Auth from "./pages/Auth";
import { getToken } from "./utils/token";
import AuthContext from "./context/AuthContext";
import Home from "./pages/Home";


function App() {
  // const [auth, setAuth] = useState({name: "DAvid"})  // Con un login activo
  const [auth, setAuth] = useState(undefined)         // Significa si estado o sin loguin
  
  // const authData = {
  //   name: "david C"
  // }

  // VIEW: equivale a componentDidMount, componentDidUpdate y componentWillUnmount combinados.
  useEffect(() => {
    const token = getToken();
    if(!token){
      setAuth(null);
    }
    else{
      setAuth(token);
    }
    // console.log("El token en app.js ",token)
  }, [])

  const logout = () => {
    console.log("cerrar sesión")
  }

  const setUser = (user) => {
    setAuth(user);
  }

  const authData = useMemo(
    () => ({
      auth, logout, setUser
    }),
    [auth]
  );

  return (
    <ApolloProvider client={client} >
      
      {/* Envolvemos la app en un contexto, entonces al actualizar el estado con setAuth ,
      utilizando useMemo verifica el cambio y renderiza denuevo deacuerdo a esto {!auth ? <Auth/> : <h1>Estas logueado</h1>}  */}
      <AuthContext.Provider value={authData} >
        {
          !auth ? <Auth/> : <Home/>
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
      </AuthContext.Provider>

    </ApolloProvider>
  );
}

export default App;
