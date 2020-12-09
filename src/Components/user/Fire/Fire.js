import React from "react";
import Nav from "../Nav/Nav";
import HelpButton from "../HelpButton/HelpButton";
import Footer from "../Footer/Footer";

import logo from "./img/fire.svg";

function Fire() {
  const fireLogo = (
    <img src={logo} width="60px" alt="fire logo" className="mb-4" />
  );
  return (
    <main className="page-container">
      <Nav />
      <div className="help-button-container d-flex flex-column justify-content-center align-items-center">
        <HelpButton logo={fireLogo} />
      </div>
      <Footer />
    </main>
  );
}

export default Fire;
