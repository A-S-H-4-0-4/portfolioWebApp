


// styles
import T from "../styles/components/test.module.css";

import Head from 'next/head'


// components
import ResponsiveAppBar from "../components/navbar";
import SignIn from "../components/signin";
import SignUp from "../components/signup";
import MultiActionAreaCard from "../components/card";
import MyCoolCodeBlock from "../components/codeBlock";
import Footer from "../components/footer";
import Bar from "../components/bar";

const exampleCodeBlock = `<div className={T.screen}>
<Head>
  <title>Portfolio-ASH</title>
</Head>
<MyCoolCodeBlock code = {exampleCodeBlock}
language = {"tsx"}
/>
</div>
`;

const Test = () => {
  return (
    <div className={T.screen}>
      <Head>
        <title>Portfolio-ASH</title>
      </Head>
      <MyCoolCodeBlock code = {exampleCodeBlock}
      language = {"jsx"}
      />
    {/* <Footer/> */}
      {/* <Bar /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
    </div>
  )
}


export default Test