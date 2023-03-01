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


// mui icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// api
import { callAPI } from "../api/api";

// mui
import Tooltip from "@mui/material/Tooltip";

// icons
const instagramIcon = "/icons/instagram.png"
const github = "/icons/github.png"
const linkedin = "/icons/linkedin.png"
const twitter = "/icons/twitter.png"

interface ResponseType {
  message: string;
  data: {};
  errors: Array<{}>;
}

const Contact = () => {

  const [themeColor, setThemeColor] = useState(themes.light);
  const [matches, setMatches] = useState(false);
  const [data, setData] = useState({});
  const { theme, themeCallback } = useWrapper();
  const [loader, setLoader] = useState(false);

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

  return (
    <React.Fragment>
      <Head>
        <title>CONTACT</title>
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
        {matches === false ? <div style={{ width: "60%", height: "60%", boxShadow: "1px 1px 2px 2px grey", borderRadius: "10px", marginTop: "150px", display: "flex", alignItems: "center", flexDirection: "column" }}>
          <div style={{ marginTop: "5%" }}>
            {data === undefined ? <AccountCircleIcon sx={{ fontSize: "150px", color: themeColor.text }} />
              :
              data['userImage'] !== "" && <img
                src={data['userImage']}
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "100px",
                  margin: "0px",
                }}
              />
            }
          </div>
          {data !== undefined &&
            <div style={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "space-around", marginTop: "13%" }}>
              {data['instaGram'] !== "" &&
                <Tooltip title="instaGram">
                  {/* <InstagramIcon sx={{ color: themeColor.iconColor, cursor: "pointer" , fontSize: "50px",}} onClick={() => { router.push(`https://www.instagram.com//${data['instaGram']}`) }} /> */}
                  <img
                    src={instagramIcon}
                    style={{
                      height: "80px",
                      width: "80px",
                      cursor: "pointer",
                      // borderRadius: "100px",
                      // margin: "0px",
                    }}
                    onClick={() => { router.push(`https://www.instagram.com//${data['instaGram']}`) }}
                  />
                </Tooltip>
              }
              {data['twitter'] !== "" &&
                <Tooltip title="twitter">
                  {/* <TwitterIcon sx={{ color: themeColor.iconColor, cursor: "pointer", fontSize: "50px", }} onClick={() => { router.push(`https://www.twitter.com//${data['twitter']}`) }} /> */}
                  <img
                    src={twitter}
                    style={{
                      height: "80px",
                      width: "80px",
                      cursor: "pointer",
                      // borderRadius: "100px",
                      // margin: "0px",
                    }}
                    onClick={() => { router.push(`https://www.twitter.com//${data['twitter']}`) }} />
                </Tooltip>
              }
              {data['gitHub'] !== "" &&
                <Tooltip title="gitHub">
                  {/* <GitHubIcon sx={{ color: themeColor.iconColor, cursor: "pointer", fontSize: "50px", }} onClick={() => { router.push(`https://www.github.com//${data['gitHub']}`) }} /> */}
                  <img
                    src={github}
                    style={{
                      height: "80px",
                      width: "80px",
                      cursor: "pointer",
                      // borderRadius: "100px",
                      // margin: "0px",
                    }}
                    onClick={() => { router.push(`https://www.github.com//${data['gitHub']}`) }} />
                </Tooltip>
              }
              {data['linkedIn'] !== "" &&
                <Tooltip title="linkedIn">
                  {/* <LinkedInIcon sx={{ color: themeColor.iconColor, cursor: "pointer", fontSize: "50px", }} onClick={() => { router.push(data['linkedIn']) }} /> */}
                  <img
                    src={linkedin}
                    style={{
                      height: "80px",
                      width: "80px",
                      cursor: "pointer",
                      // borderRadius: "100px",
                      // margin: "0px",
                    }}
                    onClick={() => { router.push(data['linkedIn']) }} />
                </Tooltip>
              }
            </div>}
        </div> :
          <div style={{ width: "80%", height: "60%", boxShadow: "1px 1px 2px 2px grey", borderRadius: "10px", marginTop: "100px", display: "flex", alignItems: "center", flexDirection: "column" }}>
            <div style={{ marginTop: "5%" }}>
              {data === undefined ? <AccountCircleIcon sx={{ fontSize: "120px", color: themeColor.text }} />
                :
                data['userImage'] !== null && <img
                  src={data['userImage']}
                  style={{
                    height: "120px",
                    width: "120px",
                    borderRadius: "100px",
                    margin: "0px",
                  }}
                />
              }
            </div>
            <div style={{ height: "80%", display: "flex", width: "100%", flexDirection: "column", justifyContent: "space-evenly" }} >
              {data !== undefined &&

                data['instaGram'] !== "" &&
                <div style={{ width: "70%", display: "flex", marginLeft: "15%", alignItems: "center", justifyContent: "space-evenly", marginTop: "7%", cursor: "pointer" }} onClick={() => { router.push(`https://www.instagram.com//${data['instaGram']}`) }} >
                  <img
                    src={instagramIcon}
                    style={{
                      height: "30px",
                      width: "30px",

                    }}
                  />
                  <span style={{
                    color: themeColor.text, fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem", fontSize: "18px"
                  }} >InstaGram</span>
                </div>
              }
              {data !== undefined &&

                data['twitter'] !== "" &&
                <div style={{ width: "60%", display: "flex", marginLeft: "15%", alignItems: "center", justifyContent: "space-evenly", marginTop: "7%", cursor: "pointer" }} onClick={() => { router.push(`https://www.twitter.com//${data['twitter']}`) }} >
                  <img
                    src={twitter}
                    style={{
                      height: "30px",
                      width: "30px",

                    }}
                  />
                  <span style={{
                    color: themeColor.text, fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem", fontSize: "18px"
                  }} >Twitter</span>
                </div>
              }

              {data !== undefined &&

                data['linkedIn'] !== "" &&
                <div style={{ width: "65%", display: "flex", marginLeft: "15%", alignItems: "center", justifyContent: "space-evenly", marginTop: "7%", cursor: "pointer" }} onClick={() => { router.push(data['linkedIn']) }}  >
                  <img
                    src={linkedin}
                    style={{
                      height: "30px",
                      width: "30px",

                    }}
                  />
                  <span style={{
                    color: themeColor.text, fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem", fontSize: "18px"
                  }} >linkedIn</span>
                </div>
              }
              {data !== undefined &&

                data['gitHub'] !== "" &&
                <div style={{ width: "60%", display: "flex", marginLeft: "13%", alignItems: "center", justifyContent: "space-evenly", marginTop: "7%", cursor: "pointer" }} onClick={() => { router.push(`https://www.github.com//${data['gitHub']}`) }}  >
                  <img
                    src={github}
                    style={{
                      height: "30px",
                      width: "30px",

                    }}
                  />
                  <span style={{
                    color: themeColor.text, fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem", fontSize: "18px"
                  }} >gitHub</span>
                </div>
              }
            </div>
          </div>
        }
        <div>
        </div>
        <Footer
          textColor={themeColor.text}
          iconColor={themeColor.iconColor}
          borderColor={themeColor.borderColor}
          backgroundColor={themeColor.navbackground}
          data={data}
        />
      </div>
      {loader && <Loader3/>}
    </React.Fragment>
  )

}

export default Contact;