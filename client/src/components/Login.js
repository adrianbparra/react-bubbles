import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  console.log(props)

  const [userCred, setUserCreds] = useState({username: "", password: ""})
  

  const handleChange = e => {
    console.log("handle change", e.target.name)

    setUserCreds({
      ...userCred,
      [e.target.name] : e.target.value
    })
  }

  const onLoginSubmit = e => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/api/login`, userCred)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-page")
      })
      .catch(err => console.log(err))

  }
  
  return (
    <>
      
      <h1>Welcome to the Bubble App!</h1>
      <p>Find some great colors to design your web application with.</p>
      <form onSubmit={onLoginSubmit}>
        <input 
          type="username"
          name="username"
          placeholder="User Name"
          value={userCred.username} 
          onChange={handleChange}
        />

        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={userCred.password}
          onChange={handleChange}
        />

        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
