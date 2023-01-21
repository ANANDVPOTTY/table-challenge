import React, { useEffect, useState } from "react";
import "../Navbar/tablenavbar.css";
import Card from "react-bootstrap/Card";
import "../Home/home.css";
import card_img from "../../../src/images/home.jpg";
import { Container } from "react-bootstrap";

//spinner aka preloader
import { Space, Spin } from "antd";

function Home() {
  const [quotezz, setQuotes] = useState([]);

  // preloader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      // preloader
      setLoading(true);
      let response = await fetch("https://dummyjson.com/quotes");
      response = await response.json();
      // preloader
      setLoading(false);
      setQuotes(response.quotes);
      // console.log(response.quotes);
    }
    fetchMyAPI();
  }, []);

  // to reduce the array and show first 3 quotes.
  // (0,3) -> (index -> 0,1,2)
  const limitedQuotezz = quotezz.slice(0, 6);

  return (
    <>
      {loading ? (
        <>
          <Space direction="vertical" className="spinLoader">
            <Spin tip="Loading..." size="large" className="spinn" />
          </Space>
        </>
      ) : (
        <>
          {limitedQuotezz.map((itm) => {
            return (
              <>
                {/* d-inline-flex flex-row */}
                <div className="home-data">
                  <Container>
                    <Card key={itm.id}>
                      <Card.Img variant="top" src={card_img} />
                      <Card.Body>
                        <Card.Title className="text-center">
                          {itm.id}. Quotes
                        </Card.Title>
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
      )}
    </>
  );
}

export default Home;
