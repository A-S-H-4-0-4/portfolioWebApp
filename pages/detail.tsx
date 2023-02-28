

// styles
import D from "../styles/detail.module.css";
import PS from "../styles/projectScreen.module.css";

// react
import React, { useEffect, useState } from "react";

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';


// image upload
import { ImageUpload } from "../lib/fileUpload";

// components
import ResponsiveAppBar from "../components/navbar";
import Footer from "../components/footer";
import Bar from "../components/bar";
import Loader from "../components/loader";



// router
import { useRouter } from "next/router";

// code snippet
import CodeBlockDefaultExample from "../components/codeBlock";

// mui icons
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import PreviewIcon from '@mui/icons-material/Preview';
import HttpIcon from '@mui/icons-material/Http';
// storage
import { storage } from "../firebaseConfig";

// context
import { useWrapper } from "../lib/contextApi";

// Video player
import "node_modules/video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";

// muit tooltip
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

// Importing callApi
import { callAPI, methods } from "../api/api";
import { getData } from "../local/storage";
import { log } from "console";

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
        errors.map((errorObject: any) => {
          const { errorMessage } = errorObject;
          alert(errorMessage);
        });
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
      errors.map((errorObject: any) => {
        const { errorMessage } = errorObject["error"];
        alert(errorMessage);
      });
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
        <div className={PS.screen} style={{ background: "white" }}>
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


          <div className={PS.head} style={{ marginTop: "75px" }}>
            {previewVideo ?
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
              :
              <div>
              </div>
            }
            {stackList.length > 0 ? <div className={PS.bar}>
              {stackList.map(({ type, content }) => {
                return <Bar text={content} type={type} />;
              })}
            </div>
              :
              <div  >

              </div>
            }
          </div>

          {contentList.length > 0 ? <div className={PS.content}>
            {contentList.map((object: any, index: number) => {
              let renderContent = <div style={{ color: "black" }}></div>;
              switch (object["type"]) {
                case "heading":
                  renderContent = (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: "black",
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
                        color: "black",
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
                        color: "black",
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
                        color: "black",
                      }}
                    >
                      <div style={{ width: "60%" }}>
                        <CodeBlockDefaultExample
                          language={object["language"]}
                          text={object["content"]}
                          theme="dark"
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
            <div  >
              <h3> </h3>
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
