import React from "react";
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, openModal }) => {
  const { webformatURL, largeImageURL, tags } = image
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        data-img={largeImageURL}
        onClick={(event) => openModal(event.target.dataset.img)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
