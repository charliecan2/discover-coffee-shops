import { useRouter } from "next/router"
import Link from "next/link";

export default function CoffeeStore() {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      <div>Coffee Store page {router.query.id}</div>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  )
}