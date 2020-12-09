import React from "react";

import floodLogo from "./img/flood.svg";
import fireLogo from "./img/fire.svg";
import earthquakeLogo from "./img/earthquake.svg";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="bottom-navbar">
      <ul className="h-100">
        <a href="/user/flood">
          <li className="d-flex justify-content-center align-items-center h-100">
            <img src={floodLogo} width="55px" alt="flood icon" />
          </li>
        </a>
        <a href="/user/fire">
          <li className="d-flex justify-content-center  h-100">
            <img src={fireLogo} width="36px" alt="fire icon" />
          </li>
        </a>
        <a href="/user/earthquake">
          <li className="d-flex justify-content-center  h-100">
            <img src={earthquakeLogo} width="36px" alt="earthquake icon" />
          </li>
        </a>
      </ul>
    </footer>
  );
};

export default Footer;
