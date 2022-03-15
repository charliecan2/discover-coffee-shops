import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Header'

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log("Hello there, General Kenobi")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick}/>
      </main>
    </div>
  )
}
