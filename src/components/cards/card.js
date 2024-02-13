import styles from './card.module.css'

import { Link } from 'react-router-dom'


function Card (props) {

  return(
    <Link to={`/book/${props.dado.id}`}>
    <div className={styles.card}>
      <div className={styles.img}>
       { props.dado.volumeInfo.imageLinks && (
       <img src={props.dado.volumeInfo.imageLinks.thumbnail} alt={props.dado.volumeInfo.title} />
       )}
      </div>
      <div className={styles.content}>
          <p>{props.dado.volumeInfo.title}</p> 
          -
          <p>{props.dado.volumeInfo.authors[0]}</p>
      </div>
    </div>
    </Link>
  )
}

export default Card