import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className='ImageGallery'>
      {images.map((image) => <ImageGalleryItem key={nanoid()} image={image} openModal={openModal} />)}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
