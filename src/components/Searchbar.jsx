import React, { useState } from 'react';

const Searchbar = ({ searchImageHandler }) => {
  const [query, setQuery] = useState('');

  const onChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    searchImageHandler(query);
    setQuery('');
  };

  return (
    <header className='Searchbar'>
      <form className='SearchForm' onSubmit={onFormSubmitHandler}>
        <button type='submit' className='SearchForm-button'>
          <span className='SearchForm-button-label'>Search</span>
        </button>
        <input
          className='SearchForm-input'
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          onChange={onChangeHandler}
          value={query}
        />
      </form>
    </header>
  );
};

export default Searchbar;
