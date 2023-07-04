import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(inputValue.trim());
    setInputValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}></span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInput}
        />
      </form>
    </header>
  );
};
