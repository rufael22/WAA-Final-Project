import React, { useEffect, useRef, useState, useContext } from "react";
import axios from 'axios'
import axiosInstance from "../../services/AxiosService";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
import { useNavigate } from "react-router-dom";
import { GlobalUser } from "../GlobalUser/globalUser";
export default function Login() {
  const nav = useNavigate();
  const isUserLogged = useContext(GlobalUser);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessgae] = useState("");
  const userNameChanged = (e) => {
    setUserName(e.target.value);
  };
  const passwordChanged = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password && userName) {
      // login axios request here......
      console.log({email: userName, password: password })
      axiosInstance.post("http://localhost:8080/login", {email: userName, password: password })
      // axios.post("http://localhost:8080/login", {email: "Raphi", password: "123"})
      // .then(res=>console.log(res.data))
      // .catch(err=>console.log(err))
      isUserLogged.login(userName);
      nav("/property");
    }
    if (!userName && !password) {
      setErrorMessgae("please enter username and Password");
    } else if (!userName) {
      setErrorMessgae("please enter username ");
    } else if (!password) {
      setErrorMessgae("please enter password ");
    }
  };

  return (
    <div className=" row  ml-5 ">
      <div className="card text-center col-md-4 offset-4 mt-5">
        <h1>
          <center>Login</center>
        </h1>
        <p style={{ color: "red" }}>{errorMessage}</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="userName">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={userNameChanged}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={passwordChanged}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-dark btn-block" type="submit">
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
