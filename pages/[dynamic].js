import { useRouter } from "next/router";
import Head from "next/head";

export default function DynamicRoute() {
  const route = useRouter();
  return (
    <div>
      <Head>
        <title>{route.query.dynamic}</title>
      </Head>
      <div>This is a Dynamic Route page {route.query.dynamic}</div>
    </div>  
  )
}