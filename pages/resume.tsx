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

    {loader && <Loader3 />}
  </React.Fragment>)
}



export default Resume;