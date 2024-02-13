import Card from '../components/cards/card'

import styles from './Result.module.css'

import { Link } from 'react-router-dom'


function Result () {
  return(
    <div className={styles.Result}>
      <div>
        <p>Aqui estão as melhores escolhas baseadas nas suas respostas...</p>
      </div>
      <div className={styles.cards}>
        
      </div>
      <div className={styles.button} >
        <button >Fazer uma nova busca</button>
      </div>
    </div>
    )
}

export default Result