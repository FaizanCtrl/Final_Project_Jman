import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
// import { elements } from "chart.js";
import api from "../../api";
// import axios from 'axios'
function Login(props) {
  const { user, login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, isAdmin, name, id } = response.data;
        console.log(response.data);
        localStorage.setItem("token", token); // Store the token in localStorage
        login({ isAdmin, name, id });
        props.showToast({ success: "Login Successful" });
        isAdmin ? navigate(`/dashboard`) :navigate(`/dashboard/${id}`); 
        // navigate(`/dashboard/${id}`);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      props.showToast({ error: error.response.data });
      // console.log("Hello", error.response.data.error);
    }
    setPassword("");
    setEmail("");
  };
  return (
    <div
      className="row h-100  justify-content-center"
      style={{
        background: "linear-gradient(to bottom, #C39393,#0F0F5F, #0F0F5F)",
      }}
    >
      <div
        className="col-8 m-auto row justify-content-center col-md-3 p-5 rounded "
        style={{ border: "1px solid #ededed", width: "400px", height: "500px" }}
      >
        {/* header start */}
        <div className="d-flex justify-content-center mt-5">
          <p className="fs-1 fw-bold rounded text-light">Login</p>
        </div>
        {/* header end */}
        {/* form start  */}
        <form
          className="mt-4 d-flex flex-column justify-items-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            {/* <label htmlFor="userName" className="form-label ">User Name</label> */}
            <input
              type="username"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              className="form-control p-2"
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="password" className="form-label">Password</label> */}
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
              className="form-control p-2"
            />
          </div>
          {error && <div className="error text-danger mb-2">{error}</div>}
          <div className="row mt-5 justify-content-center">
            <button type="submit" className="w-50 fs-5 p-2 btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        {/* form end */}
        {/* registration link */}
        <div className="mt-3 text-light text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
