import styles from './Home.module.css'

function Home () {
  return(
    <div className={styles.Home}>
      <div className={styles.intro}>
        <p>Encontre o <span>livro</span> perfeito para cada <span>momento</span></p>
        <a href="/search">Começar agora</a>

      </div>
      <div className={styles.img}>
      </div>

    </div>
  )
}

export default Home