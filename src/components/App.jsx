import React, { Component } from 'react';
import Searchbar from './searchbar';
import fetchService from './fetchService';
import Loader from './loader';
import ImageGallery from './imageGallery';
import Modal from './modal';
import Button from './button';

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
    fetchService('', this.state.page).then((res) => {
      this.setState((prevState) => {
        return { ...prevState, images: res.data.hits };
      });
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoad: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  searchImageHandler = (searchQuery) => {
    this.setState({ isLoad: true });
    fetchService(searchQuery, this.state.page).then((res) => {

      this.setState((prevState) => {
        return { ...prevState, images: res.data.hits, searchQuery, page: 1 };
      });
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoad: false });
      });
  };

  loadMoreBtn = () => {
    this.setState({ isLoad: true });
    fetchService(this.state.searchQuery, this.state.page + 1).then((res) => {

      this.setState((prevState) => {
        return { ...prevState, images: [...prevState.images, ...res.data.hits], page: prevState.page + 1 };
      });
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoad: false });
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
