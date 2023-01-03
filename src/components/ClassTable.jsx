import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Xtable.css";
import { Container } from "react-bootstrap";
//modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// preloader
import Spinner from "react-bootstrap/Spinner";

export default class ClassTable extends Component {
  constructor() {
    super();
    this.state = {
      //Table
      data: [],

      search: { firstName: "", email: "", university: "", phone: "" },
      //preloader
      loading: false,
      //Modal
      show: false,
      modelitem: [],
    };
  }

  componentDidMount() {
    //preloader
    this.setState({ loading: true });
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((res) => this.setState({ data: res.users }));
    //preloader
    this.setState({ loading: false });
  }

  //model
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = (itm) => {
    this.setState({ modelitem: itm });
    this.setState({ show: true });
  };

  handleChange = (event) => {
    // console.log("1", event.target);
    const { name, value } = event.target;
    // console.log("2", name, value);
    this.setState({ search: { ...this.state.search, [name]: value } });
    // console.log("3", this.state.search);
  };

  // Function to filter the table data based on the search keywords
  filterData = (itm) => {
    return itm.filter((item) => {
      return (
        item.firstName
          .toLocaleLowerCase()
          .includes(this.state.search.firstName.toLocaleLowerCase()) &&
        item.email
          .toLocaleLowerCase()
          .includes(this.state.search.email.toLocaleLowerCase()) &&
        item.phone.includes(this.state.search.phone) &&
        item.university
          .toLocaleLowerCase()
          .includes(this.state.search.university.toLocaleLowerCase())
      );
    });
  };

  //Preloader

  render() {
    return (
      <>
        {/*-------------preloader----------------- */}
        {this.state.loading ? (
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
              <h3 className="text-center mt-3">Class Table</h3>
              <Row className="text-center">
                <div className="input-field mt-3 mb-3 py-3 d-flex justify-content-between rounded">
                  <div>
                    <input
                      type="text"
                      list="data-name"
                      name="firstName"
                      placeholder="Search For Name..."
                      onChange={this.handleChange}
                    />
                    <datalist id="data-name">
                      {this.state.data.map((itm) => {
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
                      onChange={this.handleChange}
                    />
                    <datalist id="data-email">
                      {this.state.data.map((itm) => {
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
                      onChange={this.handleChange}
                    />
                    <datalist id="data-num">
                      {this.state.data.map((itm) => {
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
                      onChange={this.handleChange}
                    />
                    <datalist id="data-university">
                      {this.state.data.map((itm) => {
                        return <option>{itm.university}</option>;
                      })}
                    </datalist>
                  </div>
                </div>
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
                {this.filterData(this.state.data).map((itm) => {
                  return (
                    <>
                      <div className="row-details text-break">
                        <Row
                          key={itm.id}
                          onClick={() => {
                            this.handleShow(itm);
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
              show={this.state.show}
              onHide={this.handleClose}
              className="modal-xl text-sm-left"
              // aria-labelledby="contained-modal-title-vcenter"
              // centered
            >
              <Modal.Header closeButton>
                <Modal.Title className="text-primary">User Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row md={2}>
                    <Col xs={6}>
                      <b>Name: </b>
                      {this.state.modelitem.firstName +
                        " " +
                        this.state.modelitem.lastName}
                    </Col>

                    <Col xs={6}>
                      <b>Email: </b>
                      {this.state.modelitem.email}
                    </Col>

                    <Col xs={6}>
                      <b>Phone: </b>
                      {this.state.modelitem.phone}
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

                    <Col xs={6}>
                      <strong>University: </strong>
                      {this.state.modelitem.university}
                    </Col>

                    {/*---------------------------------------------------------------*/}

                    <Col xs={6}>
                      <strong>Age: </strong>
                      {this.state.modelitem.age}
                    </Col>

                    <Col xs={6}>
                      <strong>Gender: </strong>
                      {this.state.modelitem.gender}
                    </Col>

                    <Col xs={6}>
                      <strong>User-Agent: </strong>
                      {this.state.modelitem.userAgent}
                    </Col>

                    <Col xs={6}>
                      <strong>macAddress: </strong>
                      {this.state.modelitem.macAddress}
                    </Col>

                    <Col xs={6}>
                      <strong>User-Name: </strong>
                      {this.state.modelitem.username}
                    </Col>
                    <Col xs={6}>
                      <strong>Password: </strong>
                      {this.state.modelitem.password}
                    </Col>
                    <Col xs={6}>
                      <strong>Date Of Birth: </strong>
                      {this.state.modelitem.birthDate}
                    </Col>
                    <Col xs={6}>
                      <strong>Blood Group: </strong>
                      {this.state.modelitem.bloodGroup}
                    </Col>

                    <Col className="table-img">
                      <strong>Profile Picture: </strong>
                      <img src={this.state.modelitem.image} alt="profile-img" />
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </>
    );
  }
}
