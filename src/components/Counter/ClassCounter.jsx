import React, { Component } from "react";
import "../Counter/classCounter.css";

export default class ClassCounter extends Component {
  constructor() {
    super();
    this.state = {
      valueShow: 0,
      decrementValue: 0,
    };
  }

  handleChangeColor = (color) => {
    document.body.style.backgroundColor = color;
  };

  increment = () => {
    this.setState({ valueShow: this.state.valueShow + 1 });
  };
  decrement = () => {
    // value > 0 ? value - 1 : 0
    this.setState({
      valueShow: this.state.valueShow > 0 ? this.state.valueShow - 1 : 0,
    });
  };
  render() {
    return (
      <>
        <section className="wholeCont">
          <div className="container1">
            <button className="button-55" onClick={this.increment}>
              Incement +
            </button>
            <label>{this.state.valueShow}</label>
            <button className="button-55" onClick={this.decrement}>
              Decrement -
            </button>
          </div>
          <div className="container2">
            <button onClick={() => this.handleChangeColor("green")}>💚</button>
            <button onClick={() => this.handleChangeColor("blue")}>💙</button>
          </div>
        </section>
      </>
    );
  }
}
