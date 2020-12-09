import React from "react";

import "./sidebar.css";

function Sidebar({ status }) {
  return (
    <>
      <aside className={`sidebar-wrapper ${status}`}>
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="/admin">Dashboard</a>
          </li>
          <li>
            <a href="/admin/reports">Report History</a>
          </li>
          <li>
            <a href="/admin/login">Logout</a>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
