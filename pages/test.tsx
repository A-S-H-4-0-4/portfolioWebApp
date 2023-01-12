


// styles
import T from "../styles/components/test.module.css";

import Head from 'next/head'

// components
import ResponsiveAppBar from "../components/navbar";
import SignIn from "../components/signin";
import SignUp from "../components/signup";
import MultiActionAreaCard from "../components/card";

const Test = () => {
  return (
    <div className={T.screen}>
      <Head>
        <title>Portfolio-ASH</title>
      </Head>
      <ResponsiveAppBar />
      <SignIn />
      <MultiActionAreaCard />
    </div>
  )
}


export default Test