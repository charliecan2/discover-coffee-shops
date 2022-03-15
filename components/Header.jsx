import styles from './header.module.css'

export default function Header(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee </span>
        <span className={styles.title2}>Connoisseur</span></h1>
      <p className={styles.subtitle}>Discover your local coffee shops</p>
      <button className={styles.button} onClick={props.handleOnClick}>{props.buttonText}</button>
    </div> 
  )
}