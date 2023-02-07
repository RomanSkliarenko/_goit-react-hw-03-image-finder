import React from "react";

const Button = ({ loadMoreBtn }) => {
  return (
    <button type="button" onClick={loadMoreBtn} className="Button">
      Load more
    </button>
  );
};

export default Button;
