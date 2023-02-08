import React, { Component } from "react";
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    searchImageHandler: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  onChangeHandler = (event) => {
    this.setState({ query: event.target.value });
  };

  onFormSubmitHandler = (event) => {
    event.preventDefault();
    this.props.searchImageHandler(this.state.query);
    this.setState({ query: "" });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onFormSubmitHandler}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeHandler}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
