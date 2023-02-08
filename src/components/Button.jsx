import React from "react";
import PropTypes from 'prop-types';

const Button = ({ loadMoreBtn }) => {
  return (
    <button type="button" onClick={loadMoreBtn} className="Button">
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMoreBtn: PropTypes.func.isRequired,
};

export default Button;
