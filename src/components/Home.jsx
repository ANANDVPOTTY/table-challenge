import React, { useEffect, useState } from "react";
import "./tablenavbar.css";
import Card from "react-bootstrap/Card";
// import { Col, Row } from "react-bootstrap";

import card_img from "../../src/images/home.jpg";
import { Container } from "react-bootstrap";

function Home() {
  const [kill, setQuotes] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("https://dummyjson.com/quotes");
      response = await response.json();
      setQuotes(response.quotes);
      // console.log(response.quotes);
    }
    fetchMyAPI();
  }, []);

  return (
    <>
      {kill.map((itm) => {
        return (
          <>
            <div className="home-data d-inline-flex flex-row">
              <Container>
                <Card style={{ width: "18rem" }} key={itm.id}>
                  <Card.Img variant="top" src={card_img} />
                  <Card.Body>
                    <Card.Title>{itm.id} Quotes</Card.Title>
                    <Card.Text>{itm.quote}</Card.Text>
                    <Card.Text>Author: {itm.author}</Card.Text>
                  </Card.Body>
                </Card>
              </Container>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Home;
