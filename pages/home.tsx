// style
import H from "../styles/home.module.css";

// react
import React, { useEffect, useState } from "react";

// router
import { useRouter } from "next/router";

// components
import ResponsiveAppBar from "../components/navbar";
import SignIn from "../components/signin";
import SignUp from "../components/signup";
import MultiActionAreaCard from "../components/card";
import { homedir } from "os";
import Footer from "../components/footer";
import { getData } from "../local/storage";

// image
const bannerImage = "/images/banner.jpg"


const Home = () => {
  const [color, setColor] = React.useState('white')
  const [headcolor, setHeadColor] = React.useState('black')
  const [textcolor, setTextColor] = React.useState('black')
  const [backgroundColor, setbackgroundColor] = React.useState('white')
  const [matches, setMatches] = useState(false);
  const [session,setSession] = useState("")
  if (typeof window !== "undefined") {
    window.matchMedia("(min-width: 900px)").matches;
  }

  useEffect(() => {
    window
      .matchMedia("(max-width: 900px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  const value:string = getData("session")
  if (value !== null) {
    setSession(value)
  }  

  }, []);
  return (
    <React.Fragment>
      {session===""?<div></div>:<div className={H.screen} style={{ backgroundColor: backgroundColor, height: "auto", width: "100%", display: "flex", flexDirection: "column" }}>
        <ResponsiveAppBar callBack={() => {
          if (color == "white") {
            setColor("rgb(53, 53, 53)");
            setHeadColor("lightblue")
            setTextColor("#cccc")
            setbackgroundColor("rgb(32, 32, 32)")
          }
          else {
            setColor("white");
            setbackgroundColor("white");
            setHeadColor("#3a3838");
            setTextColor("black")
          }
        }}
          colour={headcolor}
          color={color}
        />
        {matches == false && <div className={H.banner}>
          <div className={H.lbanner}>
            <h1 style={{ color: headcolor, width: "80%", fontFamily: "monospace", letterSpacing: '.3rem', }}> Welcome to my Portal! </h1>
            <p style={{ color: textcolor, width: "80%" }} > Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint adipisci mollitia facilis reiciendis quibusdam nulla repellat, consequuntur commodi maiores officiis ea ducimus quidem voluptates eaque nesciunt non, magni nobis enim? Reprehenderit, fugiat architecto. Assumenda veritatis ratione temporibus, nostrum sunt impedit quas molestias eos doloremque, dolore qui ullam? Vero illum veritatis ullam nihil ? </p></div>
          <div className={H.rbanner}>
            <img src={bannerImage} />
          </div>
        </div>}
        {matches == true && <div className={H.banner}>
          <div className={H.bannertext}>
            <h1 style={{ color: headcolor, width: "80%", fontFamily: "monospace", letterSpacing: '.3rem', }}> Welcome to my Portal! </h1>
            <p style={{ color: textcolor, width: "80%" }} > Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint adipisci mollitia facilis reiciendis quibusdam nulla repellat, consequuntur commodi maiores officiis ea ducimus quidem voluptates eaque nesciunt non, magni nobis enim? Reprehenderit, fugiat architecto. Assumenda veritatis ratione temporibus, nostrum sunt impedit quas molestias eos doloremque, dolore qui ullam? Vero illum veritatis ullam nihil perferendis enim assumenda, nisi dolorum. Ipsam dolores quas facilis nisi ipsa pariatur, ullam modi quam iure labore, ducimus non magnam enim sequi omnis obcaecati veniam tempore! Tempora itaque porro sit at placeat suscipit vero, quos officiis atque ipsam vel unde rem eum modi vitae repellendus id, expedita tempore? </p>
          </div>
        </div>
        }

        <div className={H.content}>
          <h1 style={{ color: headcolor, fontFamily: "monospace", letterSpacing: '.3rem', fontSize: "30px" }}> Projects </h1>
          <div className={H.cards}>
            <MultiActionAreaCard />
            <MultiActionAreaCard />
            <MultiActionAreaCard />
            <MultiActionAreaCard />
            <MultiActionAreaCard />
            <MultiActionAreaCard />
          </div>
        </div>
        <Footer />
      </div>}


    </React.Fragment>
  )
}


export default Home