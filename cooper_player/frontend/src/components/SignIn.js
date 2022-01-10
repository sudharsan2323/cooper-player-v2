import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';

import UserNavigation from "./shared/UserNavigation";
const axios = require("axios");


const SignIn = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    if(!location.data){
      history.push("/")
    }
  })
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    const user = {
      email,
      password
    }
    axios.post("http://localhost:8080/user/signin", user)
      .then((res) => {
        const token = res.data.token
        localStorage.setItem("auth", token)
        localStorage.setItem("user", res.data.user._id)
        localStorage.setItem("status", res.data.user.status)
        location.data.authHandler()
        history.push("/")
      })
      .catch((err) => {
        console.log(err);
      })

  }
  if(localStorage.getItem("user")){
    return (
      <Redirect to={`/`}/>
    )
  }
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<UserNavigation />, document.getElementById("nav1"))}
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            value={email}
            onChange={onChangeEmail}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            password={password}
            onChange={onChangePassword}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignIn;
