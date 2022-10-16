import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock = () => {
  return(
    <div className={styles.root}>
      <h1>
        <span className={styles.icon}>:(</span>
        <br/>
        Page Not Found!
      </h1>
      <p className={styles.description}>К сожалению данная страница отсутствует в нашем интеренет магазине</p>
    </div>
  )
}