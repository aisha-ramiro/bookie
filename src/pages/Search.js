import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Result from './Result';
import Card from '../components/cards/card';

import styles from './Search.module.css'

function Search() {

  const [parameters, setParameters] = useState({
    pageCount: '',
    genre: '',
    language: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [userName, setUserName] = useState('')


  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters({ ...parameters, [name]: value });
    setUserName(parameters.user)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${parameters.genre}+language:${parameters.language}&maxResults=12`
      );
      const data = await response.json();

      // Filtrar os resultados com base no número de páginas selecionado
      const filteredResults = data.items.filter((book) => {
        if (parameters.pageCount === 'upTo100' && book.volumeInfo.pageCount <= 100) {
          return true;
        } else if (parameters.pageCount === 'over200' && book.volumeInfo.pageCount > 200) {
          return true;
        } else if (parameters.pageCount === 'over300' && book.volumeInfo.pageCount > 300) {
          return true;
        } else if (parameters.pageCount === 'over400' && book.volumeInfo.pageCount > 400) {
          return true;
        } else {
          return false;
        }
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setSearchSubmitted(true);
  };
  return (
    <div className={styles.Search}>
      {!searchSubmitted && (
        <>
          <div className={styles.searchIntro}>
            <h3>Pronto para começar?</h3>
            <p>Nos conte um pouco mais sobre você, e encontraremos o livro ideal para ser a sua próxima leitura!</p>
          </div>

          <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <input type="text" name='name' value={parameters.user} placeholder='Seu nome'/>
              <select name="genre" id="genre" value={parameters.genre} onChange={handleChange}>
                <option selected disabled >Gênero favorito</option>
                <option value="fiction">Ficção</option>
                <option value="history">Não Ficção</option>
                <option value="poetry">Poesia</option>
                <option value="romance">Romance</option>
                <option value="horror">Terror</option>
                <option value="classical">Literatura Clássica</option>     
              </select>
            
              <select name="pageCount"
            value={parameters.pageCount}
            onChange={handleChange} >
                <option selected disabled>Número de páginas</option>
                <option value="">Select Page Count</option>
            <option value="upTo100">Up to 100 pages</option>
            <option value="over200">Over 200 pages</option>
            <option value="over300">Over 300 pages</option>
            <option value="over400">Over 400 pages</option>
              </select>
              <input type="submit" value='Buscar' />
            </form>
          </div>

        </>
      )}
      
    
      {searchSubmitted && ( 
          <>
          <div className={styles.Result}> 
        <p>{`Olá ${userName}! Aqui estão as melhores escolhas baseadas nas suas respostas...`}</p>
        <div className={styles.cards}>
        {searchResults.map((book) => (
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