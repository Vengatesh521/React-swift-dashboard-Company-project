import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
