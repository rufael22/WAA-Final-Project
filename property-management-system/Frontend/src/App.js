import { ReactKeycloakProvider } from "@react-keycloak/web";
import Footer from "components/Footer/Footer";
import Header from "./components/Header/Header";

import React, { useContext, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter";

import { GlobalUser } from "./components/GlobalUser/globalUser";
function App() {
  //   const handleOnEvent = async (event, error) => {
  //     console.log(event);
  //     if (event === "onAuthSuccess") {
  //       if (keycloak.authenticated) {
  //         storeToken(keycloak.token);
  //       }
  //     }
  //   };
  const login = (userName) => {
    localStorage.setItem("user", userName);
  };
  const logout = (userName) => {
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      {/* <ReactKeycloakProvider authClient={keycloak} onEvent={handleOnEvent}> */}
      <GlobalUser.Provider value={{ login, logout }}>
        <BrowserRouter>
          <Header />
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </GlobalUser.Provider>
      {/* </ReactKeycloakProvider> */}
    </div>
  );
}

export default App;
