import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Xtable.css";
import { Container } from "react-bootstrap";

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
    this.setState({ loading: true });
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((res) => this.setState({ data: res.users }));
    this.setState({ loading: false });
  }

  handleChange = (event) => {
    // console.log("1", event.target);
    const { name, value } = event.target;
    // console.log("2", name, value);
    this.setState({ search: { ...this.state.search, [name]: value } });
    // console.log("3", this.state.search);
  };

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
              Class Table
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
                          //   onClick={() => {
                          //     handleShow(itm);
                          //   }}
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
          </>
        )}
      </>
    );
  }
}
