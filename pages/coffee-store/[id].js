import { useRouter } from "next/router"
import Link from "next/link";
import Head from "next/head";

import data from '../../data/coffee-stores.json'

export async function getStaticProps({params}) {
  console.log(params);

  return {
    props: {
      coffeeStore: data.find(coffeeStore => {
        return coffeeStore.id == params.id
      })
    }, // will be passed to the page component as props
  }
}

export function getStaticPaths(){
  const paths = data.map(store => {
    return { params: { id: store.id.toString() }}
  })

  return {
    paths: paths,
    fallback: true
  }
}

export default function CoffeeStore(props) {
  const router = useRouter();
  console.log("router", router);

  if(router.isFallback){
    return <div>Loading...</div>
  }

  const { address, name, neighbourhood } = props.coffeeStore

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  )
}