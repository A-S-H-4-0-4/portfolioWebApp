// style
import H from "../styles/home.module.css";

// styles
import PS from "../styles/projectScreen.module.css";

// react
import React, { useEffect, useState } from "react";

// context
import { useWrapper } from "../lib/contextApi";

// router
import { useRouter } from "next/router";

// head
import Head from "next/head";

// components
import ResponsiveAppBar from "../components/navbar";
import MultiActionAreaCard from "../components/card";

import Footer from "../components/footer";
import { callAPI } from "../api/api";


// image
const bannerImage = "/images/banner.jpg";

interface ResponseType {
  message: string;
  data: {};
  errors: Array<{}>;
}

const Home = () => {
  const router = useRouter();
  const [color, setColor] = React.useState("white");
  const [headcolor, setHeadColor] = React.useState("black");
  const [textcolor, setTextColor] = React.useState("black");
  const [backgroundColor, setbackgroundColor] = React.useState("white");
  const [matches, setMatches] = useState(false);
  const [showName, setShowName] = useState(false);
  const [projects,setProjects] = useState([])
  const { session,theme } = useWrapper();
  
  var [loader,setLoader] = useState(false)

  const componentDidMount = async() => {
    setLoader(true)
    
    
    const response: ResponseType = await callAPI(
      'project',
    );

    const { message, data, errors } = response;
    if (message === "success") {
      if (typeof data === "object") {
        console.log("data");
        
        console.log(data);
        setProjects(data['data'])
      }
    } else if (message === "failure") {
      errors.map((errorObject:any) => {
        const { errorMessage } = errorObject;
        alert(errorMessage);
      });
    } else {
      alert("Some Server error");
    }

  }
  const moveToProject = (name:string)=>{
      const check:any[] = projects.filter((data:any,index:number)=>{
        return data['title'] === name;
      }) 
      if (check.length>0) {
        return alert("Project name already exist")
      }
      router.push("/projectScreen",{
        query:{
          'name':name
        }
      })
  }


  useEffect(()=>{
    componentDidMount()

    return ()=>{}
  },[])



  const AddName = ({ close, save }) => {
    const [fieldName, setName] = useState("");

    return (
      <div className={PS.glass}>
        <div
          className={PS.cBox}
          style={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "space-between",
            background: "white",
            height: "20%",
          }}
        >
          <div
            style={{
              // borderBottom: "1px solid black",
              display: "flex",
              height: "20%",
              width: "100%",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                fontFamily: "arieal",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                color: " rgb(41, 91, 228)",
                marginLeft: "10px",
              }}
            >
              Add ProjectName
              <text
                style={{
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={close}
              >
                <span
                  style={{ height: "14px", color: "red", fontWeight: "400" }}
                >
                  {" "}
                  CLOSE
                </span>
              </text>
            </span>
          </div>

          <div
            className={PS.details}
            style={{ width: "90%", marginLeft: "3%", color: " black" }}
          >
            <span>Name</span>
            <input
              style={{
                marginLeft: "3%",
                height: "30px",
                width: "60%",
                borderRadius: "3px",
                border: "1px solid black",
              }}
              type="name"
              name="Name"
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
          </div>

          <div style={{ display: "flex" }}>
            <button
              onClick={() => {
                save(fieldName);
              }}
              style={{
                height: "30px",
                width: "20%",
                borderRadius: "5px",
                cursor: "pointer",
                background: "#007bff",
                marginLeft: "3%",
                marginBottom: "1%",
                border: "none",
                color: "white",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (typeof window !== "undefined") {
    window.matchMedia("(min-width: 900px)").matches;
  }

  useEffect(() => {
    window
      .matchMedia("(max-width: 900px)")
      .addEventListener("change", (e) => setMatches(e.matches));

    // if (!session) {
    //   router.back()
    // }
    console.log("home use effect");
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HOME</title>
      </Head>
      {session === "" ? (
        <div></div>
      ) : (
        <div
          className={H.screen}
          style={{
            backgroundColor: backgroundColor,
            height: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ResponsiveAppBar
            callBack={() => {
              if (color == "white") {
                setColor("rgb(53, 53, 53)");
                setHeadColor("lightblue");
                setTextColor("#cccc");
                setbackgroundColor("rgb(32, 32, 32)");
              } else {
                setColor("white");
                setbackgroundColor("white");
                setHeadColor("#3a3838");
                setTextColor("black");
              }
            }}
            colour={headcolor}
            color={color}
          />
          {matches == false && (
            <div className={H.banner}>
              <div className={H.lbanner}>
                <h1
                  style={{
                    color: headcolor,
                    width: "80%",
                    fontFamily: "monospace",
                    letterSpacing: ".3rem",
                  }}
                >
                  {" "}
                  Welcome to my Portal!{" "}
                </h1>
                <p style={{ color: textcolor, width: "80%" }}>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  adipisci mollitia facilis reiciendis quibusdam nulla repellat,
                  consequuntur commodi maiores officiis ea ducimus quidem
                  voluptates eaque nesciunt non, magni nobis enim?
                  Reprehenderit, fugiat architecto. Assumenda veritatis ratione
                  temporibus, nostrum sunt impedit quas molestias eos
                  doloremque, dolore qui ullam? Vero illum veritatis ullam nihil
                  ?{" "}
                </p>
                <button
                  onClick={() => {
                    setShowName(true);
                  }}
                >
                  Create Project
                </button>
              </div>
              <div className={H.rbanner}>
                <img src={bannerImage} />
              </div>
            </div>
          )}
          {matches == true && (
            <div className={H.banner}>
              <div className={H.bannertext}>
                <h1
                  style={{
                    color: headcolor,
                    width: "80%",
                    fontFamily: "monospace",
                    letterSpacing: ".3rem",
                  }}
                >
                  {" "}
                  Welcome to my Portal!{" "}
                </h1>
                <p style={{ color: textcolor, width: "80%" }}>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  adipisci mollitia facilis reiciendis quibusdam nulla repellat,
                  consequuntur commodi maiores officiis ea ducimus quidem
                  voluptates eaque nesciunt non, magni nobis enim?
                  Reprehenderit, fugiat architecto. Assumenda veritatis ratione
                  temporibus, nostrum sunt impedit quas molestias eos
                  doloremque, dolore qui ullam? Vero illum veritatis ullam nihil
                  perferendis enim assumenda, nisi dolorum. Ipsam dolores quas
                  facilis nisi ipsa pariatur, ullam modi quam iure labore,
                  ducimus non magnam enim sequi omnis obcaecati veniam tempore!
                  Tempora itaque porro sit at placeat suscipit vero, quos
                  officiis atque ipsam vel unde rem eum modi vitae repellendus
                  id, expedita tempore?{" "}
                </p>
              </div>
            </div>
          )}

          <div className={H.content}>
            <h1
              style={{
                color: headcolor,
                fontFamily: "monospace",
                letterSpacing: ".3rem",
                fontSize: "30px",
              }}
            >
              {" "}
              Projects{" "}
            </h1>
            <div className={H.cards}>
              {projects.map((data:any,index:number)=>{
                return <MultiActionAreaCard 
                key={index}
                description={data['description']} id={data['id']} title={data['title']} thumbanailUrl={data['thumbanailUrl']} />
              })}
              
            </div>
          </div>
          <Footer />
        </div>
      )}
      {showName && <AddName close={()=>{setShowName(false)}} save={moveToProject} />}
    </React.Fragment>
  );
};

export default Home;
