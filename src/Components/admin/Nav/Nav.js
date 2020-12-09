import React from "react";

function Nav({ status, setStatus }) {
  const handleClick = (e) => {
    e.preventDefault();
    setStatus(status === "closedSidebar" ? "openedSidebar" : "closedSidebar");
    console.log(status);
  };
  return (
    <>
      <nav
        className="user-navbar"
        style={{
          justifyContent: "flex-end",
          height: "7%",
          minHeight: "50px",
          boxShadow: "0px 12px 10px -11px rgba(0, 0, 0, 0.75)",
        }}
      >
        <a href="/" onClick={handleClick}>
          <svg
            className="menu-button p-1"
            height="22px"
            viewBox="0 -53 384 384"
            width="27px"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              border: "1px solid var(--primary-white)",
              borderRadius: "2px",
            }}
          >
            <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          </svg>
        </a>
      </nav>
    </>
  );
}

export default Nav;
