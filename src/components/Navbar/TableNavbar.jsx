import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./tablenavbar.css";

import avp from "../../../src/images/avp-logo-avp-.webp";
import { NavDropdown, OverlayTrigger, Tooltip } from "react-bootstrap";

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
          <Nav.Item>
            <Nav.Link href="/" className="text-white hvr-underline-reveal me-4">
              Home »
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/ftable"
              className="text-white hvr-underline-reveal me-4"
            >
              Function-Table »
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/ctable"
              className="text-white hvr-underline-reveal me-3"
            >
              Class-Table »
            </Nav.Link>
          </Nav.Item>
          {/*------------------------ Nav Dropdown ---------------------------*/}
          <NavDropdown title="Other Links" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/counter">Counter</NavDropdown.Item>
            <NavDropdown.Item href="/rpg">R P G</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Empty</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Empty</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
}

export default TableNavbar;
