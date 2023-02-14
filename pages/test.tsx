


// styles
import T from "../styles/components/test.module.css";

import Head from 'next/head'


// components
import ResponsiveAppBar from "../components/navbar";
import Footer from "../components/footer";
import MultiActionAreaCard from "../components/card";
import CodeBlockDefaultExample from "../components/codeBlock";
import AlertDialog from "../components/alertBox";
import Loader from "../components/loader";
import { LinearProgress, Stack } from "@mui/material";

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
      <CodeBlockDefaultExample language={"tsx"} text={exampleCodeBlock} theme='dark' />
      {/* <Footer/> */}
      {/* <Bar /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      
{/* <AlertDialog heading = "Alert!!" text= "You Have Successfully LogedIn" /> */}
    </div>
  )
}


export default Test