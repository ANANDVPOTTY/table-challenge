import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../RPG/rpg.css";
export default class RpG extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      upperInput: false,
      lowerInput: false,
      containsNum: false,
      containsSymbol: false,
      totalChar: 0,
      upperSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowerSet: "abcdefghijklmnopqrstuvwxyz",
      numberSet: "1234567890",
      symbolSet: "!@#$%^&*.,-_/:=+{}[]()✌❤",
    };
  }

  //------------------------------------------------------

  handleChangeChar = (e) => {
    console.log(e);
    this.setState({ totalChar: e.target.value });
  };

  handleChangeUpper = (e) => {
    console.log(e);
    this.setState({ upperInput: e.target.checked });
  };

  handleChangeLower = (e) => {
    console.log(e);
    this.setState({ lowerInput: e.target.checked });
  };

  handleChangeNum = (e) => {
    console.log(e);
    this.setState({ containsNum: e.target.checked });
  };

  handleChangeSymbol = (e) => {
    console.log(e);
    this.setState({ containsSymbol: e.target.checked });
  };

  //------------------------------------------------------

  getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)];
  };

  //------------------------------------------------------

  generatePassword = () => {
    if (this.state.upperInput) {
      this.setState({
        password: (this.state.password += this.getRandomData(
          this.state.upperSet
        )),
      });
    }
    if (this.state.lowerInput) {
      this.setState({
        password: (this.state.password += this.getRandomData(
          this.state.lowerSet
        )),
      });
    }
    if (this.state.containsNum) {
      this.setState({
        password: (this.state.password += this.getRandomData(
          this.state.numberSet
        )),
      });
    }
    if (this.state.containsSymbol) {
      this.setState({
        password: (this.state.password += this.getRandomData(
          this.state.symbolSet
        )),
      });
    }
    if (this.state.password.length < this.state.totalChar) {
      return this.generatePassword(this.state.password);
    }
  };

  render() {
    function truncateString(str, num) {
      if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
      } else {
        return str;
      }
    }
    return (
      <>
        <div className="main">
          <div className="box">
            <span id="pass-box">
              {truncateString(this.state.password, this.state.totalChar)}
            </span>
            <div className="roww">
              <div className="left">Password Length</div>
              <div className="right">
                <Form.Control
                  type="number"
                  max="30"
                  min="2"
                  onChange={(e) => {
                    this.handleChangeChar(e);
                  }}
                />
              </div>
            </div>
            <div className="roww">
              <label htmlFor="upper-case">
                <div className="left">Contains Uppercase</div>
              </label>
              <div className="right">
                <Form.Check
                  type="switch"
                  name=""
                  onChange={(e) => {
                    this.handleChangeUpper(e);
                  }}
                />
              </div>
            </div>
            <div className="roww">
              <label htmlFor="lower-case">
                <div className="left">Contains Lowercase</div>
              </label>
              <div className="right">
                <Form.Check
                  type="switch"
                  name=""
                  onChange={(e) => {
                    this.handleChangeLower(e);
                  }}
                />
              </div>
            </div>
            <div className="roww">
              <label htmlFor="numbers">
                <div className="left">Contains Numbers</div>
              </label>
              <div className="right">
                <Form.Check
                  type="switch"
                  name=""
                  onChange={(e) => {
                    this.handleChangeNum(e);
                  }}
                />
              </div>
            </div>
            <div className="roww">
              <label htmlFor="symbols">
                <div className="left">Contains Symbols</div>
              </label>
              <div className="right">
                <Form.Check
                  type="switch"
                  name=""
                  onChange={(e) => {
                    this.handleChangeSymbol(e);
                  }}
                />
              </div>
            </div>
            <div className="roww">
              <Button className="gbtn" onClick={this.generatePassword}>
                Generate
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
