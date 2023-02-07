import React from "react";
import ImageGalleryItem from './imageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} openModal={openModal} />
    </ul>
  );
};

export default ImageGallery;
