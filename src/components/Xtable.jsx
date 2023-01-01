import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./Xtable.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import axios from "axios";

// preloader
import Spinner from "react-bootstrap/Spinner";

function Xtable() {
  // table
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    firstName: "",
    email: "",
    university: "",
    phone: "",
  });

  // preloader
  const [loading, setLoading] = useState(false);

  // model
  const [show, setShow] = useState(false);
  const [modelitem, setItems] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      // preloader
      setLoading(true);
      let response = await fetch("https://dummyjson.com/users");
      response = await response.json();
      // preloader
      setLoading(false);
      setData(response.users);
    }
    fetchMyAPI();
  }, []);

  // model
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (itm) => {
    setItems(itm);
    console.log(modelitem);
    setShow(true);
  };

  const handleChange = (event) => {
    // console.log("1", event.target);
    const { name, value } = event.target;
    // console.log("2", name, value);
    setSearch({ ...search, [name]: value });
    // console.log("3", search);
  };

  // Function to filter the table data based on the search keywords
  const filterData = (itm) => {
    return itm.filter((item) => {
      return (
        item.firstName
          .toLocaleLowerCase()
          .includes(search.firstName.toLocaleLowerCase()) &&
        item.email
          .toLocaleLowerCase()
          .includes(search.email.toLocaleLowerCase()) &&
        item.phone.includes(search.phone) &&
        item.university
          .toLocaleLowerCase()
          .includes(search.university.toLocaleLowerCase())
      );
    });
  };

  return (
    <>
      {/*-------------preloader----------------- */}
      {loading ? (
        <>
          <div className="preloader">
            <Spinner
              animation="border"
              size="xl"
              variant="success"
              role="status"
            />
            <p>Loading...</p>
          </div>
        </>
      ) : (
        <>
          <Container>
            <Row className="text-center">
              {/*----------------------------input with dropdown------------------------ */}
              <div className="input-field mt-3 mb-3 py-3 d-flex justify-content-between rounded">
                <div>
                  <input
                    type="text"
                    list="data-name"
                    name="firstName"
                    placeholder="Search For Name..."
                    onChange={handleChange}
                  />
                  <datalist id="data-name">
                    {filterData(data).map((itm) => {
                      return (
                        <option>{itm.firstName + " " + itm.lastName}</option>
                      );
                    })}
                  </datalist>
                </div>
                {/*----------------------------------------2----------------------------------*/}
                <div>
                  <input
                    type="email"
                    list="data-email"
                    name="email"
                    placeholder="Search For Email..."
                    onChange={handleChange}
                  />
                  <datalist id="data-email">
                    {filterData(data).map((itm) => {
                      return <option>{itm.email}</option>;
                    })}
                  </datalist>
                </div>
                {/*-----------------------------------------3---------------------------------*/}
                <div>
                  <input
                    type="text"
                    name="phone"
                    list="data-num"
                    placeholder="Search For phone num..."
                    onChange={handleChange}
                  />
                  <datalist id="data-num">
                    {filterData(data).map((itm) => {
                      return <option>{itm.phone}</option>;
                    })}
                  </datalist>
                </div>
                {/*------------------------------------------4--------------------------------*/}
                <div>
                  <input
                    type="text"
                    name="university"
                    list="data-university"
                    placeholder="Search For university..."
                    onChange={handleChange}
                  />
                  <datalist id="data-university">
                    {filterData(data).map((itm) => {
                      return <option>{itm.university}</option>;
                    })}
                  </datalist>
                </div>
              </div>
              {/*----------------------------input with dropdown------------------------ */}
              <hr />

              <div className="text-center row-heading">
                <Row>
                  <Col>
                    <b>ID</b>
                  </Col>
                  <Col>
                    <b>Name</b>
                  </Col>
                  <Col>
                    <b>Email</b>
                  </Col>
                  <Col>
                    <b>Phone</b>
                  </Col>
                  <Col>
                    <b>Address</b>
                  </Col>
                  <Col>
                    <b>Company Address</b>
                  </Col>
                  <Col>
                    <b>University</b>
                  </Col>
                  <Col>
                    <b>Image</b>
                  </Col>
                </Row>
              </div>
              {filterData(data).map((itm) => {
                return (
                  <>
                    <div className="row-details text-break">
                      <Row
                        key={itm.id}
                        onClick={() => {
                          handleShow(itm);
                        }}
                      >
                        <Col>{itm.id}</Col>
                        <Col>{itm.firstName + " " + itm.lastName}</Col>
                        <Col>{itm.email}</Col>
                        <Col>{itm.phone}</Col>
                        <Col>{itm.address.address}</Col>
                        <Col>{itm.company.address.address}</Col>
                        <Col>{itm.university}</Col>
                        <Col className="table-img">
                          <img src={itm.image} alt="profile-img" />
                        </Col>
                      </Row>
                    </div>
                  </>
                );
              })}
            </Row>
          </Container>
          {/*--------------------------Modal----------------------------------*/}
          <Modal show={show} onHide={handleClose} className="modal-xl">
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row md={3}>
                  <Col>
                    <b>Name: </b>
                    {modelitem.firstName + " " + modelitem.lastName}
                  </Col>

                  <Col>
                    <b>Email: </b>
                    {modelitem.email}
                  </Col>

                  <Col>
                    <b>Phone: </b>
                    {modelitem.phone}
                  </Col>

                  {/* <Col xs={6}>
                    <b>Address: </b>
                    {modelitem.address.address}
                  </Col> */}
                  {/* 
                  <Col xs={6}>
                    <b>Company/Address: </b>
                    {modelitem.company.address.address}
                  </Col> */}

                  <Col>
                    <strong>University: </strong>
                    {modelitem.university}
                  </Col>

                  {/*---------------------------------------------------------------*/}

                  <Col>
                    <strong>University: </strong>
                    {modelitem.university}
                  </Col>

                  <Col>
                    <strong>University: </strong>
                    {modelitem.university}
                  </Col>

                  <Col>
                    <strong>University: </strong>
                    {modelitem.university}
                  </Col>

                  <Col>
                    <strong>University: </strong>
                    {modelitem.university}
                  </Col>

                  {/* <Col className="table-img">
                    <img src={modelitem.image} alt="profile-img" />
                  </Col> */}
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default Xtable;
