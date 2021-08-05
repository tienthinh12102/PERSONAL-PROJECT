import React from "react";
import "./style.scss";

const Pagination = (props) => {
  const { productsPerPage, totalProducts, paginate, currentPage, onHandleBeforePage, onHandleAfterPage } = props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  function onHandleDecreasePage(number) {
    if (onHandleBeforePage) {
      onHandleBeforePage(number);
    }
    return;
  }

  function onHandleIncreasePage(number) {
    if (onHandleAfterPage) {
      onHandleAfterPage(number)
    }
  }

  return (
    <div className="shoppage__pagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination" style={{ cursor: "pointer" }}>
          <li className="page-item" className={currentPage <= 1 ? "disabled" : ""} onClick={() => onHandleDecreasePage(1)}>
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
          {pageNumbers.map(number => (
            <li className={`page-item ${currentPage === number ? "active" : ""}`} key={number}>
              <a onClick={() => paginate(number)} className="page-link">{number}</a>
            </li>
          ))}
          <li className="page-item" className={currentPage >= pageNumbers.length ? "disabled" : ""} onClick={() => onHandleIncreasePage(1)}>
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
