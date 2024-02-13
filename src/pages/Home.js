import styles from './Home.module.css'

function Home () {
  return(
    <div className={styles.Home}>
      <div className={styles.intro}>
        <p>Encontre o <span>livro</span> perfeito para cada <span>momento</span></p>
        <button>Começar agora</button>

      </div>
      <div className={styles.img}>
      </div>

    </div>
  )
}

export default Home