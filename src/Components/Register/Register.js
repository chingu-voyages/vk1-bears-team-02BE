import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { Nav, Logo, Footer } from "../Login/Login";
import axios from 'axios'
import "./register.css";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    var flag = 1;
    const initDetails = {
      username: data.username,
      password: data.password,
      email: data.email

    }
    axios.post('http://localhost:5000/register', initDetails).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        alert(error.response.data.msg);
        flag = 0;
      }
    }).then(function () {
      if (flag == 1) {
        alert("Success")
      }
    })


  };

  return (
    <main className="page-container register-page">
      <Nav page="Register" />
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

        <Form.Group controlId="formBasicEmail" className="w-50">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
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
          Sign Up
        </Button>
      </Form>
      <Footer footerTitle="Already have an account?" footerLink="Login" />
    </main>
  );
};

export default Register;
