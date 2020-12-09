import React from "react";
import { Link } from "react-router-dom";
import "./main.css";

const Main = () => {
  return (
    <>
      <main className="page-container">
        <div className="d-flex flex-column align-items-center justify-content-center logo-wrapper h-50">
          <h1 className="logo">e-Sagip</h1>
          <p className="sub-title">One click away to get help.</p>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center h-50">
          <Button name="Create Account" link="/register" />
          <Button name="Login" link="/login" />
          <Button name="About" link="/about" />
          <Footer />
        </div>
      </main>
    </>
  );
};

const Button = ({ name, link }) => {
  return (
    <Link to={link}>
      <button className="button">{name}</button>
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="mt-1">
      Copyright &#169; 2020. All rights reserved.
    </footer>
  );
};

export default Main;
