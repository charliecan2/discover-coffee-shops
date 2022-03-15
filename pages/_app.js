import '../styles/globals.css'
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Component {...pageProps} />
    <footer className={styles.footer}>
      <p>Made with ❤️ by Carlos Cantu</p>
    </footer>
  </>
  )
}

export default MyApp
