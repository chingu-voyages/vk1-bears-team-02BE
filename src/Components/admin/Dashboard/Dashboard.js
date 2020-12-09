import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Map/Map";

function Dashboard() {
  const [status, setStatus] = useState("openedSidebar");
  return (
    <main className="admin-page-container">
      <Nav status={status} setStatus={setStatus} />
      <Sidebar status={status} />
      <Map />
    </main>
  );
}

export default Dashboard;
