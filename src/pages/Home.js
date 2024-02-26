import styles from './Home.module.css'
import { Link } from 'react-router-dom';

function Home () {
  const handleClearLocalStorage = () => {
    localStorage.clear(); 
};

  return(
    <div className={styles.Home}>
      <div className={styles.intro}>
        <p>Encontre o <span>livro</span> perfeito para cada <span>momento</span></p>
        <button onClick={handleClearLocalStorage}>
                <Link to="/search">
                    Começar agora
                </Link>
            </button>
      </div>
      <div className={styles.img}>
      </div>

    </div>
  )
}

export default Home