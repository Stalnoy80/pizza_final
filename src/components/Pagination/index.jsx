import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected)}
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={currentPage}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
