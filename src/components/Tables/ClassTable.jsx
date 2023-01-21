import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Xtable.css";
import { Container } from "react-bootstrap";
import ClassPagination from "../Pagination/ClassPagination";
import { Input } from "antd";

//modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//spinner aka preloader
import { Space, Spin } from "antd";

export default class ClassTable extends Component {
  constructor() {
    super();
    this.state = {
      //Table
      data: [],

      search: { firstName: "", email: "", university: "", phone: "" },
      //preloader
      loading: true,
      //Modal
      show: false,
      modelitem: [],
      //Pagination
      currentPage: 1,
      postsPerPage: 5,
    };
  }


  componentDidMount() {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((res) => this.setState({ loading: false, data: res.users }));
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
    const { name, value } = event.target;
    this.setState({ search: { ...this.state.search, [name]: value } });
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
  
 

  //change pages
  // paginate = (pageNumber) => this.setState({ postsPerPage: pageNumber });

  render() {
     //Pagination
  //Pagination Get Current Posts
  // const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
  // const filteredData = filterData(this.state.data);
  // const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

    // Preloader;
    if (this.state.loading) {
      return (
        <>
          <Space direction="vertical" className="spinLoader">
            <Spin tip="Loading..." size="large" className="spinn" />
          </Space>
        </>
      );
    } else {
      return (
        <>
          <>
            <Container>
              <h3 className="text-center mt-3">Class <span>Table</span></h3>
              <hr />
              <Row className="text-center mb-5">
                {/*----------------------------input with dropdown------------------------ */}
                <div className="input-field mt-3 mb-3 py-3 d-flex justify-content-between rounded">
                  <div>
                    <h6>Name:</h6>
                    <Input
                      allowClear
                      className="py-2 me-5"
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
                    <h6>Email Id:</h6>
                    <Input
                      allowClear
                      className="py-2 me-5"
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
                    <h6>Number:</h6>
                    <Input
                      allowClear
                      className="py-2 me-5"
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
                    <h6>University:</h6>
                    <Input
                      allowClear
                      className="py-2 me-5"
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
                <hr />
                {/*------------------pagination-----------------*/}
                {/* <ClassPagination 
                   postsPerPage={postsPerPage}
                   totalPosts={filteredData.length}
                   paginate={paginate}
                /> */}
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
        </>
      );
    }
  }
}
