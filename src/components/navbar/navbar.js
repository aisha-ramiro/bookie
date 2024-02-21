import styles from './navbar.module.css'


 function Navbar () {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h2>Bookie</h2>
      </div>
      <div className={styles.menu}>
        <a href="/">Página inicial</a>
        {/*<a href="/search">Nova recomendação</a>*/}
      </div>
    </div>
  )
}

export default Navbar