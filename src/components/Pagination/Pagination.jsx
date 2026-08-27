import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {

  if (totalPages <= 1) {
    return null;
  }


  const handlePageChange = (page) => {

    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    if (onPageChange) {
      onPageChange(page);
    }

  };


  /*
  =========================================================
  CREATE PAGE NUMBERS
  =========================================================
  */

  const pages = [];

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {

    pages.push(page);

  }


  return (

    <div className="vs-pagination dynamic-pagination">

      <ul>

        {/* PREVIOUS */}

        {currentPage > 1 && (

          <li>

            <button
              type="button"
              className="dynamic-pagination-arrow"
              onClick={() =>
                handlePageChange(
                  currentPage - 1
                )
              }
              aria-label="Previous page"
            >

              <i className="far fa-arrow-left" />

            </button>

          </li>

        )}


        {/* PAGE NUMBERS */}

        {pages.map((page) => (

          <li key={page}>

            <button
              type="button"
              className={
                page === currentPage
                  ? "active"
                  : ""
              }
              onClick={() =>
                handlePageChange(page)
              }
            >

              {page}

            </button>

          </li>

        ))}


        {/* NEXT */}

        {currentPage < totalPages && (

          <li>

            <button
              type="button"
              className="dynamic-pagination-arrow"
              onClick={() =>
                handlePageChange(
                  currentPage + 1
                )
              }
              aria-label="Next page"
            >

              <i className="far fa-arrow-right" />

            </button>

          </li>

        )}

      </ul>

    </div>

  );

};


export default Pagination;