import { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Notiflix from 'notiflix';
import fetchService from './fetchService';


function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  const searchImageHandler = (query) => {
    if (query === '') {
      Notiflix.Notify.warning('Please enter search query');
      return;
    }
    if (query === searchQuery) {
      Notiflix.Notify.warning('Please enter new search query');
      return;
    }
    setPage(1);
    setSearchQuery(query);
    setImages([])
  };

  const loadMoreBtn = () => {
    setPage(page + 1);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 300);
  };

  const openModal = (modalImage) => {
    setModalIsOpen(true);
    setModalImage(modalImage);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  useEffect(() => {
    setIsLoad(true);
    fetchService(searchQuery, page).then(({data}) => {
      const { hits } = data;
      setImages(hits);
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, []);

  useEffect(() => {
    fetchService(searchQuery, page).then(({data}) => {
      const { hits } = data;
      setImages(prevState => {
        return [...prevState, ...hits]
      });
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [searchQuery, page]);



  return (
    <div className='App'>
      <Searchbar searchImageHandler={searchImageHandler} />
      {isLoad ? (
        <Loader />
      ) : null}
      <ImageGallery images={images} openModal={openModal} />
      {images.length > 0 ? (
        <Button loadMoreBtn={loadMoreBtn} />
      ) : null}

      {modalIsOpen ? (
        <Modal img={modalImage} closeModal={closeModal} />
      ) : null}
    </div>
  );
}

export default App;
