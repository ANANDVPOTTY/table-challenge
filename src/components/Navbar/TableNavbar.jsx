import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./tablenavbar.css";

import avp from "../../../src/images/avp-logo-avp-.webp";
import {  OverlayTrigger, Tooltip } from "react-bootstrap";

function TableNavbar() {
  return (
    <>
      <Navbar
        variant="dark"
        bg="dark"
        className="navnav"
        sticky="top"
        style={{ backgroundColor: "#0a4275" }}
      >
        {/*------Tool Tip to image-------*/}
        {["right"].map((placement) => (
          <OverlayTrigger
            key={placement}
            placement={placement}
            overlay={<Tooltip id={`tooltip-${placement}`}>Home Page!!</Tooltip>}
          >
            <Navbar.Brand href="/" className="ms-5 me-5">
              <div className="avp hvr-bounce-in">
                <img src={avp} alt="avp" />
              </div>
            </Navbar.Brand>
          </OverlayTrigger>
        ))}
        {/*------Tool Tip to image-------*/}
        <Nav className="justify-content-end ms-auto me-5 fs-6">
          <Nav.Item className="ms-3">
            <Nav.Link href="/" className="text-white">
              Home »
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="ms-3">
            <Nav.Link
              href="/ftable"
              className="text-white"
            >
              Function-Table »
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="ms-3 me-3">
            <Nav.Link
              href="/ctable"
              className="text-white"
            >
              Class-Table »
            </Nav.Link>
          </Nav.Item>
          {/*------------------------ Nav Dropdown ---------------------------*/}
          <div className="dropdown show">
              <a className="btn btn-secondary dropdown-toggle" 
                href="#" role="button" 
                id="dropdownMenuLink" 
                data-bs-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false"
                >
              Quick Links
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href="/counter">Counter</a>
                <a className="dropdown-item" href="/rpg">R P G</a>
                <a className="dropdown-item" href="#">3</a>
              </div>
          </div>
        </Nav>
      </Navbar>
      </>
  );
}

export default TableNavbar;
