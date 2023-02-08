import React, { Component } from 'react';
import Searchbar from './Searchbar';
import fetchService from './fetchService';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    modalIsOpen: false,
    modalImage: '',
    isLoad: false,
  };

  componentDidMount() {
    this.setState({ isLoad: true });
    fetchService(this.state.searchQuery, this.state.page).then((res) => {
      this.setState({ images: res.data.hits });
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoad: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page && prevState.searchQuery === this.state.searchQuery) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 300);
      this.setState({ isLoad: true });
      fetchService(this.state.searchQuery, this.state.page).then((res) => {
        this.setState({ images: [...this.state.images, ...res.data.hits] });
      })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ isLoad: false });

        });
    }
    if (prevState.searchQuery !== this.state.searchQuery) {
      fetchService(this.state.searchQuery, this.state.page).then((res) => {
        this.setState({ images: res.data.hits });
      })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ isLoad: false });
        });
    }
  }

  searchImageHandler = (searchQuery) => {
    if (searchQuery === '') {
      Notiflix.Notify.warning('Please enter search query');
      return;
    }
    if (searchQuery === this.state.searchQuery) {
      Notiflix.Notify.warning('Please enter new search query');
      return;
    }
    this.setState({ searchQuery, page: 1 });
  };

  loadMoreBtn = () => {
    this.setState((prevState) => {
      return { ...prevState, page: prevState.page + 1 };
    });
  };

  openModal = (modalImage) => {
    this.setState({
      modalIsOpen: true,
      modalImage: modalImage,
    });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className='App'>
        <Searchbar searchImageHandler={this.searchImageHandler} />
        {this.state.isLoad ? (
          <Loader />
        ) : null}
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.images.length > 0 ? (
          <Button loadMoreBtn={this.loadMoreBtn} />
        ) : null}

        {this.state.modalIsOpen ? (
          <Modal img={this.state.modalImage} closeModal={this.closeModal} />
        ) : null}
      </div>
    );
  }
}

export default App;
