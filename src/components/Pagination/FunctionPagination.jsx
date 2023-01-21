import React from "react";
import { Container } from "react-bootstrap";
import "../Pagination/tablePagination.css";

const FunctionPagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav>
        <Container>
          <ul className="pagination justify-content-end">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a
                  onClick={() => paginate(number)}
                  href="#!"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </>
  );
};

export default FunctionPagination;
