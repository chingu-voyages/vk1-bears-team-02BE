import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from 'axios'
import { AuthenticationContext } from "../context/AuthenticationContext";

import "./login.css";
import backButton from "./img/back-button.svg";

const Login = () => {
  const { authenticated, setAuth, details, setDetails } = useContext(AuthenticationContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    var flag = 1;

    if (data.username === "" || data.password === "") {
      alert("Please fill out all fields");
    }
    const initDetails = {
      username: data.username,
      password: data.password,
    }
    axios.post('http://localhost:5000/login', initDetails).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        alert("Login Error");
        flag = 0
      }

    }).then(function () {
      if (flag == 1) {
        alert("Success")
        setAuth(true);
        setDetails({ username: data.username, password: data.password });

      }
    })
  };

  return (
    <main className="page-container login-page">
      <Nav page="Login" />
      <Logo />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column align-items-center my-4 h-50"
      >
        <Form.Group controlId="formBasicEmail" className="w-50">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            className="form-field"
            ref={register}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="w-50">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            className="form-field"
            ref={register}
          />
        </Form.Group>
        <Button className="rounded-pill font-weight-bolder" type="submit">
          Login
        </Button>
      </Form>
      <Footer footerTitle="Don't have an account?" footerLink="Register" />
    </main>
  );
};

const Nav = ({ page }) => {
  return (
    <nav className="d-flex justify-content-between justify-content ">
      <Link to="/">
        <img
          className="back-button mt-4 ml-4"
          src={backButton}
          alt="back button"
        />
      </Link>
      <p className="page-name mt-4 mr-4">{page}</p>
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 d-flex flex-column align-items-center">
          <h1>e-Sagip</h1>
          <p className="sub-title">One click away to get help.</p>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ footerTitle, footerLink }) => {
  return (
    <div className="footer d-flex flex-column align-items-center">
      <h6>{footerTitle}</h6>
      <Link to={`/${footerLink}`} className="mt-n2 font-italic">
        {footerLink}
      </Link>
    </div>
  );
};

export { Login, Nav, Logo, Footer };
