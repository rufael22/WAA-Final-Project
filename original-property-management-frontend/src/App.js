
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import React, { useContext, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter";
import { storeToken } from "./Utils";
import { GlobalUser } from "./components/GlobalUser/globalUser";
function App() {
  
  const login = (userName) => {
    localStorage.setItem("user", userName);
  };
  const logout = (userName) => {
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      <GlobalUser.Provider value={{ login, logout }}>
        <BrowserRouter>
          <Header />
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </GlobalUser.Provider>
    </div>
  );
}

export default App;
