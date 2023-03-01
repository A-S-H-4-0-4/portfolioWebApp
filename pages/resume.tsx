// react
import React, { useEffect, useState } from "react";

// context
import { useWrapper } from "../lib/contextApi";

// head
import Head from "next/head";

// theme
import { themes } from "../lib/theme";

// router
import { useRouter } from "next/router";


// components
import ResponsiveAppBar from "../components/navbar";
import Footer from "../components/footer";

// loader
import { Loader3 } from "../components/loader";

// api
import { callAPI } from "../api/api";

interface ResponseType {
  message: string;
  data: {};
  errors: Array<{}>;
}



const Resume = () => {
  const [themeColor, setThemeColor] = useState(themes.light);
  const [matches, setMatches] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const { theme, themeCallback } = useWrapper();

  // router
  const router = useRouter();
  const phoneNumber = router.query.phoneNumber

  if (typeof window !== "undefined") {
    window.matchMedia("(min-width: 1100px)").matches;
  }

  useEffect(() => {
    window
      .matchMedia("(max-width: 1100px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    if (theme === "light") {
      setThemeColor(themes.light);
    } else {
      setThemeColor(themes.dark);
    }
    componentDidMount();
    if (!phoneNumber) {
      router.back()
    }
  }, []);

  const componentDidMount = async () => {
    setLoader(true)
    const response: ResponseType = await callAPI(
      `profile/${phoneNumber}`,
    );
    setLoader(false)
    const { message, data, errors } = response;
    if (message === "success") {
      if (typeof data === "object") {
        setData(data['data']);
      }
    } else if (message === "failed") {
      errors.map((errorObject: any) => {
        const { errorMessage } = errorObject["error"];
        alert(errorMessage);
      });
    } else {
      alert("Some Server error");
    }
  };

  return (<React.Fragment>
    <Head>
      <title>RESUME</title>
    </Head>
    <div style={{ width: "100vw", height: "100vh", background: themeColor.background, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }} >
      <ResponsiveAppBar
        callBack={() => {
          if (theme == "light") {
            themeCallback("dark");
            setThemeColor(themes.dark);
          } else {
            themeCallback("light");
            setThemeColor(themes.light);
          }
        }}
        color={themeColor.navbackground}
        colour={themeColor.text}
        createProject={""}
        phoneNumber={phoneNumber}
        profile={() => { }}
      />

      {data ? <iframe src={data['resume']} height="100%" width="100%" style={{ border: "none", marginTop: "73px" }} /> :
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h2>Please attach your resume first<a style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { router.push("/home") }} > Go to Home</a> </h2>
        </div>
      }

      {/* <Footer
        textColor={themeColor.text}
        iconColor={themeColor.iconColor}
        borderColor={themeColor.borderColor}
        backgroundColor={themeColor.navbackground}
        data={data}
      /> */}
    </div>
    {loader && <Loader3 />}
  </React.Fragment >)
}



export default Resume;