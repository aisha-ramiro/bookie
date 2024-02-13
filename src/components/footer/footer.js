import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";

import styles from './footer.module.css'

function Footer () {
  return(
    <div className={styles.footer}>
      <div className={styles.about}>
        <div>
          <h3>Bookie</h3>
        </div>
        <div>
          <ol>
            <p>Mais informações</p>
            <li>Sobre nós</li>
            <li>Fale conosco</li>
            <li>Política de privacidade</li>
          </ol>
        </div>
      </div>
      <div className={styles.copy}>
        <div>
        <p className={styles.copyRight}><span>Bookie</span> &copy;2024</p>

        </div>
        <div className={styles.social}>
          <p>Nos acompanhe:</p>
          <AiOutlineInstagram />
          <AiOutlineTwitter />
        </div>
      </div>
    </div>
  )
}

export default Footer