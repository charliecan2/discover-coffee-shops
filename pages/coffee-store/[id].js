import { useRouter } from "next/router"
import Link from "next/link";

import data from '../../data/coffee-stores.json'

export async function getStaticProps({params}) {
  console.log(params)
  return {
    props: {
      coffeeStore: data.find(coffeeStore => {
        return coffeeStore.id == params.id
      })
    }, // will be passed to the page component as props
  }
}

export function getStaticPaths(){
  return {
    paths: [
      { params: {id: "0"} },
      { params: {id: "1"} }
    ],
    fallback: true
  }
}

export default function CoffeeStore(props) {
  const router = useRouter();
  console.log("router", router);

  if(router.isFallback){
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>Coffee Store page {router.query.id}</div>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  )
}