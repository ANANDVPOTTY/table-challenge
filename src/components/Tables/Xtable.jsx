import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./Xtable.css";
import Modal from "react-bootstrap/Modal";
import { Form, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FunctionPagination from "../Pagination/FunctionPagination";
// import axios from "axios";

//spinner aka preloader
import { Space, Spin } from "antd";
import { Input } from "antd";

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

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    async function fetchMyAPI() {
      // preloader
      setLoading(true);
      //----------------
      let response = await fetch("https://dummyjson.com/users");
      response = await response.json();
      // preloader
      setLoading(false);
      //----------------
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

  //Pagination Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredData = filterData(data);
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  //change pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/*-------------preloader----------------- */}
      {loading ? (
        <>
          <Space direction="vertical" className="spinLoader">
            <Spin tip="Loading..." size="large" className="spinn" />
          </Space>
        </>
      ) : (
        <>
          <Container>
            <h3 className="text-center mt-3">Function <span>Table</span></h3>
            <hr />
            <Row className="text-center mb-3">
              {/*----------------------------input with dropdown------------------------ */}
              <div className="input-field mb-3 py-3 d-flex justify-content-between rounded">
                <div>
                  <h6>Name:</h6>
                  <Input
                    allowClear
                    className="py-2 me-5"
                    type="text"
                    list="data-name"
                    name="firstName"
                    placeholder="Search for name..."
                    onChange={handleChange}
                  />
                  <datalist id="data-name">
                    {filterData(data).map((itm) => {
                      console.log(data);
                      return (
                        <option>{itm.firstName + " " + itm.lastName}</option>
                      );
                    })}
                  </datalist>
                </div>
                {/*----------------------------------------2----------------------------------*/}
                <div>
                  <h6>Email Id:</h6>
                  <Input
                    allowClear
                    className="py-2 me-5"
                    type="email"
                    list="data-email"
                    name="email"
                    placeholder="Search for email..."
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
                  <h6>Number:</h6>
                  <Input
                    allowClear
                    className="py-2 me-5"
                    type="text"
                    name="phone"
                    list="data-num"
                    placeholder="Search for number..."
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
                  <h6>University:</h6>
                  <Input
                    allowClear
                    className="p-2 me-5"
                    type="text"
                    name="university"
                    list="data-university"
                    placeholder="Search for university..."
                    onChange={handleChange}
                  />
                  <datalist id="data-university">
                    {filterData(data).map((itm) => {
                      return <option>{itm.university}</option>;
                    })}
                  </datalist>
                </div>
              </div>
              {/*----------------------------input with dropdown Ends------------------------ */}
              <hr />
              <FunctionPagination
                postsPerPage={postsPerPage}
                totalPosts={filteredData.length}
                paginate={paginate}
              />
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
              {currentPosts.map((itm) => {
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
          <Modal
            show={show}
            onHide={handleClose}
            className="modal-xl text-sm-left"
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">
                Function Table User Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row md={2}>
                  <Col xs={6} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      Name:
                    </b>
                    {modelitem.firstName + " " + modelitem.lastName}
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      Email:
                    </b>
                    {modelitem.email}
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      Phone:
                    </b>
                    {modelitem.phone}
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      University:
                    </b>
                    {modelitem.university}
                  </Col>

                  {/*---------------------------------------------------------------*/}

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      Age:
                    </b>
                    {modelitem.age}
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      Gender:{" "}
                    </b>
                    {modelitem.gender}
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      User-Agent:{""}
                    </b>
                    <p className="ms-4">{modelitem.userAgent}</p>
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      macAddress:{" "}
                    </b>
                    {modelitem.macAddress}
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      User-Name:{" "}
                    </b>
                    {modelitem.username}
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      Password:
                    </b>
                    {modelitem.password}
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      Date Of Birth:
                    </b>
                    {modelitem.birthDate}
                  </Col>

                  <Col xs={6}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <b
                      className="form-check-label ms-2"
                      for="flexCheckIndeterminate"
                    >
                      Blood Group:{" "}
                    </b>
                    {modelitem.bloodGroup}
                  </Col>

                  <Col className="table-img">
                    <strong>Profile Picture: </strong>
                    <img src={modelitem.image} alt="profile-img" />
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Container className="d-flex">
                <Form>
                  <Form.Group>
                    <FormControl placeholder="Edit Data" />
                  </Form.Group>
                </Form>
                <Button className="ms-5 btn btn-secondary">Delete</Button>
                <Container className="d-flex justify-content-end">
                  <Button variant="dark" onClick={handleClose}>
                    Close
                  </Button>
                </Container>
              </Container>
            </Modal.Footer>
          </Modal>
          <FunctionPagination
            postsPerPage={postsPerPage}
            totalPosts={filteredData.length}
            paginate={paginate}
          />
        </>
      )}
    </>
  );
}

export default Xtable;
