import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import "./nav.css";

const Nav = () => {
  const { setAuth } = useContext(AuthenticationContext);
  const [status, setStatus] = useState("close");
  const changeStatus = (e) => {
    e.preventDefault();
    setStatus(status === "close" ? "open" : "close");
  };
  const logout = (e) => {
    e.preventDefault();
    setAuth(false);
  };
  return (
    <nav className="user-navbar">
      <aside className={`nav-links-${status}`}>
        <ul>
          <li>
            <a href="/user">Profile</a>
          </li>
          <li>
            <a href="/user/flood">Get Help</a>
          </li>
          <li>
            <a href="/user/map">Map</a>
          </li>
        </ul>
      </aside>

      <a href="/" onClick={changeStatus}>
        <svg
          className="menu-button"
          height="22px"
          viewBox="0 -53 384 384"
          width="27px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        </svg>
      </a>
      <a href="/" onClick={logout}>
        <svg
          className="logout-button"
          height="24px"
          viewBox="0 0 511 512"
          width="22px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m361.5 392v40c0 44.113281-35.886719 80-80 80h-201c-44.113281 0-80-35.886719-80-80v-352c0-44.113281 35.886719-80 80-80h201c44.113281 0 80 35.886719 80 80v40c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-40c0-22.054688-17.945312-40-40-40h-201c-22.054688 0-40 17.945312-40 40v352c0 22.054688 17.945312 40 40 40h201c22.054688 0 40-17.945312 40-40v-40c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm136.355469-170.355469-44.785157-44.785156c-7.8125-7.8125-20.476562-7.8125-28.285156 0-7.8125 7.808594-7.8125 20.472656 0 28.28125l31.855469 31.859375h-240.140625c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h240.140625l-31.855469 31.859375c-7.8125 7.808594-7.8125 20.472656 0 28.28125 3.90625 3.90625 9.023438 5.859375 14.140625 5.859375 5.121094 0 10.238281-1.953125 14.144531-5.859375l44.785157-44.785156c19.496093-19.496094 19.496093-51.214844 0-70.710938zm0 0" />
        </svg>
      </a>
    </nav>
  );
};

export default Nav;
