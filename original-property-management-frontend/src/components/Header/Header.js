import "./Header.scss";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { clearToken } from "Utils";
import { GlobalUser } from "../GlobalUser/globalUser";
const Header = () => {
  const nav = useNavigate();
  const isUserLogged = useContext(GlobalUser);
  const [user, setUser] = useState(localStorage.getItem("user"));

  const onLogout = () => {
    isUserLogged.logout();
  };

  /**    useEffect(() => {
      const userInfo = localStorage.getItem("user");
      console.log(userInfo, "++");
      if (userInfo) {
        setUser(userInfo);
      } else {
        setUser(false);
      }
      // userInfo ? setUser(userInfo) : setUser(false);
    }, []); */
  return (
    <header className="header-area">
      <div className="container">
        <div className="header-top-area">
          <div className="row">
            <div className="col-md-8">
              <div className="header-top-left">
                <p>
                  <i className="fa fa-phone-square"></i> 1 (800) 888 888
                </p>
                <p>
                  <i className="fa fa-envelope"></i>{" "}
                  mom.property.service@gmail.com
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="header-top-right">
                {!localStorage.getItem("user") && (
                  <p>
                    <Link to="/login">
                      <i className="fa fa-sign-in"></i>Login
                    </Link>
                  </p>
                )}

                {localStorage.getItem("user") && (
                  <p>
                    Welcome, <strong>{localStorage.getItem("user")}!</strong>{" "}
                    &nbsp;
                    <Link to="/login" onClick={onLogout}>
                      <i className="fa fa-sign-out"></i>Logout
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="header-main-area">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <div className="site-logo">
                { <Link to="/">
                  <img src="/logo.png" alt="site logo" />
                </Link> }
              </div>
            </div>
            <div className="col-lg-7">
              <div className="mainmenu">
                <nav>
                  <ul id="navigation">
                    <li>
                      <Link to="/favorites">Save </Link>
                    </li>
                    <li className="active">
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/secured">Secure </Link>
                    </li>
                    <li>
                      <Link to="/dashboard">About Us</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="header-action">
                <Link to="/property">submit </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
