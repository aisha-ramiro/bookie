import SearchBooksAPI from '../request/SearchBooksAPI'
import styles from './Home.module.css'

function Test () {
  return(
    <div className={styles.Home}>
    <SearchBooksAPI />
    </div>
  )
}

export default Test