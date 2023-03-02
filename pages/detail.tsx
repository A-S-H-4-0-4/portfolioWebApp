

import PS from "../styles/projectScreen.module.css";

// react
import React, { useEffect, useState } from "react";


// components
import ResponsiveAppBar from "../components/navbar";
import Footer from "../components/footer";
import Bar from "../components/bar";



// router
import { useRouter } from "next/router";

// code snippet
import CodeBlockDefaultExample from "../components/codeBlock";


// context
import { useWrapper } from "../lib/contextApi";

// Video player
import "node_modules/video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";



// Importing callApi
import { callAPI, methods } from "../api/api";

// theme
import { themes } from "../lib/theme";
import Head from "next/head";

interface ResponseType {
  message: string;
  data: {};
  errors: [];
}


const ProjectScreen = () => {

  // State Management
  const [themeColor, setThemeColor] = useState(themes.light);
  const [contentList, addContent] = useState([]);
  const [stackList, addStack] = useState([]);
  const { theme, themeCallback } = useWrapper();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewVideo, setPreviewVideo] = useState<string>("");
  const [matches, setMatches] = useState(false);
  const [data, setData] = useState(false);
  const [type, setType] = useState<string>("content");
  const router = useRouter();
  const id = router.query.id;
  const phoneNumber = router.query.phoneNumber;
  const componentDidMount = async () => {
    if (id) {
      const response: ResponseType = await callAPI(`project/${id}`);
      const { message, data, errors } = response;
      if (message === "success") {
        if (typeof data === "object") {
          filldata(data)
        }
      } else if (message === "failed") {
       
      } else {
        alert("Some Server error");
      }
    }
    getProfileData();
  }

  const getProfileData = async () => {
    // setLoader(true)
    const response: ResponseType = await callAPI(
      `profile/${phoneNumber}`,
    );
    // setLoader(false);
    const { message, data, errors } = response;
    if (message === "success") {
      if (typeof data === "object") {
        setData(data['data']);
      }
    } else if (message === "failed") {
      
    } else {
      alert("Some Server error");
    }
  }


  if (typeof window !== "undefined") {
    window.matchMedia("(min-width: 1100px)").matches;
  }

  useEffect(() => {
    window
      .matchMedia("(max-width: 1100px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    componentDidMount()
    // check projectName is there or not
    if (!id) {
      router.back
    }
    // Check Theme on reload
    if (theme === "light") {
      setThemeColor(themes.light)
    }
    else {
      setThemeColor(themes.dark)
    }
    return () => { }
  }, [])





  const filldata = (data: {}) => {
    setPreviewImage(data['data'].thumbnailurl);
    setPreviewVideo(data['data'].videoUrl);
    addStack(data['data'].techStack)
    addContent(data['data'].projectContent)
  }
  if (id) {
    return (
      <React.Fragment>
        <Head>
          <title>DETAIL</title>
        </Head>
        <div className={PS.screen} style={{ background: themeColor.background}}>
          <ResponsiveAppBar
            callBack={() => {
              if (theme == "light") {
                themeCallback("dark")
                setThemeColor(themes.dark)
              } else {
                themeCallback("light")
                setThemeColor(themes.light)
              }
            }}
            color={themeColor.navbackground}
            colour={themeColor.text}
            createProject={() => {
            }}
            phoneNumber={phoneNumber}
            profile={() => { }}
          />


          {matches === false ?
            <div className={PS.head} style={{marginTop:"80px"}}>
              {previewVideo &&
                <div className={PS.video}  >
                  <Player
                    playsInline
                    poster={previewImage}
                    src={previewVideo}
                    fluid={false}
                    height={650}
                    width={1050}
                  >
                    <BigPlayButton position="center" />
                  </Player>
                </div>
              }
              {stackList.length > 0 && <div className={PS.bar}>
                {stackList.map(({ type, content, index }) => {
                  return <Bar key ={index} text={content} type={type} callBack={() => { }} backgroundColor={themeColor.navbackground} textColor={themeColor.text} deleteIcon={false} />;
                })}
              </div>
              }
            </div>
            :
            <div  >
              {previewVideo &&
                <div className={PS.mvideo}  >
                  <Player
                    playsInline
                    poster={previewImage}
                    src={previewVideo}
                    fluid={false}
                    height={250}
                    width={1000}
                  >
                    <BigPlayButton position="center" />
                  </Player>
                </div>

              }
            </div>
          }

          {matches === true &&
            <div style={{ width: "96%", marginLeft: "2%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }} >
              {type === "content" ? <span style={{ cursor: "pointer", color: "#1976d2", fontFamily: "monospace", letterSpacing: ".3rem", fontSize: "16px" }} onClick={() => { setType("content") }} >Content</span> : <span style={{ cursor: "pointer", color: themeColor.text, fontFamily: "monospace", letterSpacing: ".3rem", fontSize: "16px" }} onClick={() => { setType("content") }} >Content</span>}
              {type === "techstack" ? <span style={{ color: "#1976d2", fontFamily: "monospace", letterSpacing: ".3rem", fontSize: "16px", cursor: "pointer" }} onClick={() => { setType("techstack") }} >Tech-Stack</span> : <span style={{ cursor: "pointer", color: themeColor.text, fontFamily: "monospace", letterSpacing: ".3rem", fontSize: "16px" }} onClick={() => { setType("techstack") }} >Tech-Stack</span>}
            </div>}
          {matches === false ?
            contentList.length > 0 &&
              <div className={PS.content}  >
                {contentList.map((object: any, index: number) => {
                  let renderContent = <div style={{ color: themeColor.text }}></div>;
                  switch (object["type"]) {
                    case "heading":
                      renderContent = (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: themeColor.text,
                          }}
                        >
                          <h1>{object["content"]}</h1>{" "}
                
                        </div>
                      );
                      break;
                    case "subHeading":
                      renderContent = (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: themeColor.text,
                          }}
                        >
                          <h3>{object["content"]}</h3>{" "}
              
                        </div>
                      );
                      break;
                    case "text":
                      renderContent = (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: themeColor.text,
                          }}
                        >
                          <p style={{ width: "70%" }}>{object["content"]}</p>{" "}
              
                        </div>
                      );
                      break;
                    case "code":
                      renderContent = (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: themeColor.text,
                          }}
                        >
                          <div style={{ width: "60%" }}>
                            <CodeBlockDefaultExample
                              language={object["language"]}
                              text={object["content"]}
                              theme={themeColor.cardBackground}
                              textc={themeColor.text}
                            />
                          </div>{" "}
              
                        </div>
                      );

                      break;

                    default:
                      break;
                  }

                  return renderContent;
                })}
              </div>

            :
            type === "content" ? contentList.length > 0 &&
              <div className={PS.content}  >
                {contentList.map((object: any, index: number) => {
                  let renderContent = <div style={{ color: themeColor.text }}></div>;
                  switch (object["type"]) {
                    case "heading":
                      renderContent = (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: themeColor.text,
                          }}
                        >
                          <h1>{object["content"]}</h1>{" "}

                        </div>
                      );
                      break;
                    case "subHeading":
                      renderContent = (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: themeColor.text,
                          }}
                        >
                          <h3>{object["content"]}</h3>{" "}

                        </div>
                      );
                      break;
                    case "text":
                      renderContent = (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: themeColor.text,
                          }}
                        >
                          <p style={{ width: "70%" }}>{object["content"]}</p>{" "}

                        </div>
                      );
                      break;
                    case "code":
                      renderContent = (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: themeColor.text,
                          }}
                        >
                          <div style={{ width: "80%" }}>
                            <CodeBlockDefaultExample
                              language={object["language"]}
                              text={object["content"]}
                              theme={themeColor.cardBackground}
                              textc={themeColor.text}
                            />
                          </div>{" "}

                        </div>
                      );

                      break;

                    default:
                      break;
                  }

                  return renderContent;
                })}
              </div>

              :
              stackList.length > 0 && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                {stackList.map(({ type, content, index }) => {
                  return <Bar key={index} text={content} type={type} callBack={() => { }} backgroundColor={themeColor.navbackground} textColor={themeColor.text} deleteIcon={false} />;
                })}
              </div>


          }
          
          <Footer
            textColor={themeColor.text}
            iconColor={themeColor.iconColor}
            borderColor={themeColor.borderColor}
            backgroundColor={themeColor.navbackground}
            data={data}
          />
        </div>

      </React.Fragment>
    );
  }
};


export default ProjectScreen;
