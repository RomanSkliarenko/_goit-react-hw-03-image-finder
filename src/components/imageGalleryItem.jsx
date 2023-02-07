import React from "react";

const ImageGalleryItem = ({ images, openModal }) => {
  return images.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <li key={id} className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
          data-img={largeImageURL}
          onClick={(event) => openModal(event.target.dataset.img)}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;
