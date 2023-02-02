// react
import { useEffect } from "react";

// next
import { useRouter } from 'next/router'

// next head
import Head from 'next/head';


export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push("/signin")
    return () => { }
  }, [])
  return (
    <div>
    </div>
  )
}