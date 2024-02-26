import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/cards/card';

import styles from './Search.module.css'

function Search() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=18
        `);
      setBooks(response.data.items);
      localStorage.setItem('lastSearchResults', JSON.stringify(response.data.items));
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setSearchSubmitted(true);
  };

  useEffect(() => {
    const lastSearchResults = JSON.parse(localStorage.getItem('lastSearchResults'));
    if (lastSearchResults) {
      setBooks(lastSearchResults);
      setSearchSubmitted(true);
    }
  }, []);

  const clearSearch = () => {
    setQuery('');
    setBooks([]);
    setSearchSubmitted(false);
    localStorage.removeItem('lastSearchResults');
  };

  console.log('books', books)

  return (
    <div className={styles.Search}>
      {!searchSubmitted && (
        <div className={styles.form}>
          <div className={styles.searchIntro}>
            <h3>Faça a sua busca</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Pesquise pelo título, autor ou ISBN"
              value={query}
              onChange={handleChange}
            />
            <input type="submit" value='Buscar' />
          </form>
          <ul>
            {books.map((book, index) => (
              <li key={index}>{book.volumeInfo.title}</li>
            ))}
          </ul>
        </div>
      )}
      {searchSubmitted && (
        <>
          <button onClick={clearSearch}>Nova Busca</button>
          <div className={styles.Result}>

            <div className={styles.cards}>
              {books.map((book) => (
                <Card dado={book} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Search