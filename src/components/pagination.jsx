import { Link } from 'gatsby';
import React from 'react';
import { ChevronIcon } from './chevron-icon';
import './pagination.scss';

export const PaginationContainer = ({ children, nextLink, prevLink }) => {
  return (
    <nav className="pagination-container">
      {prevLink ? (
        <Link className="pagination-btn" to={prevLink} rel="prev">
          <ChevronIcon size={15} styles={{ transform: `rotate(90deg)` }} />
        </Link>
      ) : (
        <span className="pagination-btn"></span>
      )}
      {children}
      {nextLink ? (
        <Link className="pagination-btn" to={nextLink} rel="next">
          <ChevronIcon size={15} styles={{ transform: `rotate(-90deg)` }} />
        </Link>
      ) : (
        <span className="pagination-btn"></span>
      )}
    </nav>
  );
};

export const PaginationItem = ({ to, ...props }) => {
  return (
    <Link
      className="pagination-item"
      activeClassName="pagination-item--active"
      to={to}
      {...props}
    />
  );
};
