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

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className={styles.star}>&#9733;</span>); // Estrela preenchida
      } else {
        stars.push(<span key={i} className={styles.star}>&#9734;</span>); // Estrela vazia
      }
    }
    return stars;
  };

  

  return (
    <div className={styles.Book}>
      <div className={styles.container}>
        <div className={styles.cover}>
          {book.volumeInfo.imageLinks ? (
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="cover" />
          ) : (
            <></>
          )} 
        </div>
        <div className={styles.infoBook}>
          <div className={styles.info}>
              <h2>{book.volumeInfo.title}</h2> 
              <h3>{book.volumeInfo.authors[0]}</h3>
              {book.volumeInfo.averageRating && (
            <p>
              {renderStarRating(book.volumeInfo.averageRating)}
            </p>
          )}
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
                <>
                    <th>Gêneros: </th>
                      <td>{book.volumeInfo.categories[0]}</td>
                      </>
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
                  <>
                    <th>Código: </th>
                   
                      <td>{book.volumeInfo.industryIdentifiers[0].identifier}</td>
                      <td>{book.volumeInfo.industryIdentifiers[0].type}</td>
                      </> 
                
                )}
              </tr>
            </table>
          </div>
          
          <div className={styles.buttons}>
          {book.volumeInfo.previewLink && (
            <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          )}
          {book.saleInfo && book.saleInfo.buyLink && (
            <a href={book.saleInfo.buyLink} target="_blank" rel="noopener noreferrer">
              Comprar
            </a>
          )}
          </div>
        </div>
        
      </div>
      <div  className={styles.description}>
      <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
            </div>
    </div>
  )
}

export default Book