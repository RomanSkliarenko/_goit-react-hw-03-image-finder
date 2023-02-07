import React, { Component } from "react";
import PropTypes from "prop-types";

export class Modal extends Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };
  escapeCloseHandler = (event) => {
    if (event.code === "Escape") {
      this.props.closeModal();
    }
  };
  overlayCloseHandler = (event) => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener("keydown", this.escapeCloseHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.escapeCloseHandler);
  }
  render() {
    return (
      <div className="Overlay" onClick={this.overlayCloseHandler}>
        <div className="Modal">
          <img src={this.props.img} alt={this.props.img} />
        </div>
      </div>
    );
  }
}

export default Modal;
