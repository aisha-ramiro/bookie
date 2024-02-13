import cover from '../../assets/gogol.jpg'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios'

import styles from './Book.module.css'


function Book({ match }) {
  const { id } = useParams();


  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const bookId = id;
      setLoading(true);
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!book) {
    return <p>Livro não encontrado.</p>;
  }

  console.log('data', book)


  return (
    <div className={styles.Book}>
      <div className={styles.container}>
        <div className={styles.cover}>
          <img src={book.volumeInfo.imageLinks.medium} alt="cover" />
        </div>
        <div className={styles.infoBook}>
          <div className={styles.info}>
            <div>
              <h2>{book.volumeInfo.title}</h2> - <h3>{book.volumeInfo.authors[0]}</h3>
            </div>
            <p>{book.volumeInfo.description}</p>
          </div>
          <div className={styles.details}>
            <table>
              <caption>Detalhes</caption>
              <tr>
                <th>Ano de publicação: </th>
                <td>{book.volumeInfo.publishedDate}</td>
              </tr>
              <tr>
                {book.volumeInfo.categories && (
                  <div>
                    <th>Gêneros: </th>
                    <div>
                      <td>{book.volumeInfo.categories[0]}</td>

                    </div>
                  </div>
                )}
              </tr>
              <tr>
                <th>Idioma: </th>
                <td>{book.volumeInfo.language}</td>
              </tr>
              <tr>
                <th>Número de páginas: </th>
                <td>{book.volumeInfo.pageCount}</td>
              </tr>
              <tr>
                {book.volumeInfo.industryIdentifiers && (
                  <div>
                    <th>Código: </th>
                    <div>
                      <td>{book.volumeInfo.industryIdentifiers[0].identifier}</td>
                      <td>{book.volumeInfo.industryIdentifiers[0].type}</td>
                    </div>
                  </div>
                )}
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book