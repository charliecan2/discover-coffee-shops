import { useRouter } from "next/router"
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import classNames from "classnames";

import nearMe from '../../public/static/icons/nearMe.svg'
import places from '../../public/static/icons/places.svg'
import star from '../../public/static/icons/star.svg'
import styles from '../../styles/coffee-store.module.css'

import { fetchCoffeeStores } from "../../lib/coffee-stores";

export async function getStaticProps({params}) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find(coffeeStore => {
    return coffeeStore.id == params.id
  })

  return {
    props: {
      coffeeStore: findCoffeeStoreById? findCoffeeStoreById : {}
    }, // will be passed to the page component as props
  }
}

export async function getStaticPaths(){
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map(coffeeStore => {
    return { params: { id: coffeeStore.id.toString() }}
  })

  return {
    paths: paths,
    fallback: true
  }
}

export default function CoffeeStore(props) {
  const router = useRouter();

  const handleUpvoteButton = () => {
    console.log("upvote!")
  }

  if(router.isFallback){
    return <div>Loading...</div>
  }

  const { name, photoUrl, address, neighborhood } = props.coffeeStore

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image className={styles.storeImg} src={photoUrl} width={600} height={360} alt={name}/>
        </div>
        <div className={classNames('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src={places} width={24} height={24}/>
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image src={nearMe} width={24} height={24}/>
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src={star} width={24} height={24}/>
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Upvote!
          </button>
        </div>
      </div>
    </div>
  )
}