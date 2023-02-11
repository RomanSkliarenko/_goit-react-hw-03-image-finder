import { useEffect } from 'react';
import PropTypes from 'prop-types';


const Modal = ({ img, closeModal }) => {
  const escapeCloseHandler = (event) => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };
  const overlayCloseHandler = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', escapeCloseHandler);
    return () => {
      window.removeEventListener('keydown', escapeCloseHandler);
    };
  }, []);

  return (
    <div className='Overlay' onClick={overlayCloseHandler}>
      <div className='Modal'>
        <img src={img} alt={img} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
