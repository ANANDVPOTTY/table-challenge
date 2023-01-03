import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./tablenavbar.css";

import avp from "../../src/images/avp-logo-avp-.webp";

function TableNavbar() {
  return (
    <>
      <Navbar className="navnav" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/" className="ms-5 me-5">
          <div className="avp hvr-bounce-in">
            <img src={avp} alt="avp" />
          </div>
        </Navbar.Brand>

        <Nav className="justify-content-end ms-auto me-5 fs-5">
          <Nav.Item>
            <Nav.Link href="/" className="text-white">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/ftable" className="text-white">
              Function-Table
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/ctable" className="text-white">
              Class-Table
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}

export default TableNavbar;
