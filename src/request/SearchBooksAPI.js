import React, { useState } from 'react';
import axios from 'axios';

import Card from '../components/cards/card';

import styles from '../pages/Result.module.css'


function SearchBooksAPI () {
  //            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: query,
          key: 'AIzaSyAilzZlPDvNx_Y4h6jt3CfBUxByAGS_gDE'
        },
      });
      setBooks(response.data.items);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  console.log(books)

  return (
    <div className={styles.Result}>
      <h1>Google Books Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div className={styles.cards}>
        {books.map((book) => (
            <Card dado={book}/>
        ))}
      </div>
      <div className={styles.button} >
        <button >Fazer uma nova busca</button>
      </div>
    </div>
    
  );
}


export default SearchBooksAPI