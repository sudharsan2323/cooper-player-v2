import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

import { useHistory, Redirect } from "react-router-dom";
import UserNavigation from "./shared/UserNavigation";
const axios = require("axios");
const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      history.push("/")

    }
  }, [])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(confirmpassword !== password){
      setError("password don't match")
      return 
    }
    const user = {
      email,
      name,
      password,
      status: false
    };
    axios.post("http://localhost:8080/user/new/signup", user)
      .then((res) => {

        setError("");
        setEmail("");
        setName("");
        setPassword("");
        history.push("/");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
  };
  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  if(localStorage.getItem("user")){
    return (
      <Redirect to={`/`}/>
    )
  }

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<UserNavigation />, document.getElementById("nav1"))}
      {error && <div className="text-danger">{error}</div>}
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              onChangeNameHandler(e);
            }}
            className="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              onChangeEmailHandler(e);
            }}
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
            type="password"
            value={password}
            onChange={(e) => {
              onChangePasswordHandler(e);
            }}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group mt-1">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => {
              onChangeConfirmPasswordHandler(e);
            }}
            className="form-control"
            id="exampleInputPassword2"
            placeholder="confirm Password"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
