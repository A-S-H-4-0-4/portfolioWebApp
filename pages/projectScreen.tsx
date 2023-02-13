// styles
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

interface ResponseType {
  message: string;
  data: {};
  errors: [];
}


const ProjectScreen = () => {

  // State Management
  const [themeColor, setThemeColor] = useState(themes.light);
  const [showAddTech, setShowAddTech] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [addUrl, setAddUrl] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const [contentList, addContent] = useState([]);
  const [stackList, addStack] = useState([]);
  const [contentType, changeCType] = useState("heading");
  const [contentText, changeText] = useState("");
  const [contentLanguage, changeLanguage] = useState("text");
  const [cIndex, changeCindex] = useState(-1);
  const [sIndex, changeSindex] = useState(-1);
  const [imageFile, setImageFile] = useState<File>();
  const [videoFile, setVideoFile] = useState<File>();
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [progress, setProgress] = useState(0)
  const { session, theme, themeCallback } = useWrapper();
  const [loader, setLoader] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewVideo, setPreviewVideo] = useState<string>("");
  const [previewCard, setPreviewCard] = useState<boolean>(false);
  const [matches, setMatches] = useState(false);

  const router = useRouter();
  const name = router.query.name;
  const id = router.query.id;
  //  alert(router.query.name)
  const componentDidMount = async () => {
    if (session) {
      const response: ResponseType = await callAPI(
        'phoneNumber',
      );
      const { message, data, errors } = response;
      if (message === "success") {
        if (typeof data === "object") {
          const phoneNumber = data['data'].phoneNumber
          setPhoneNumber(phoneNumber);
        }
      } else if (message === "failed") {
        errors.map((errorObject: any) => {
          const { errorMessage } = errorObject;
          alert(errorMessage);
        });
      } else {
        alert("Some Server error");
      }

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

    }
  }

  if (typeof window !== "undefined") {
    window.matchMedia("(min-width: 1100px)").matches;
  }

  useEffect(() => {
    window
      .matchMedia("(max-width: 1100px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    if (imageFile) {
      const reader = new window.FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(imageFile);
    }
    else {
      setPreviewImage(null);
    }
    if (videoFile) {
      const reader = new window.FileReader();
      reader.onloadend = () => {
        setPreviewVideo(reader.result as string)
      }
      reader.readAsDataURL(videoFile);
    }
    else {
      setPreviewVideo(null);
    }
    componentDidMount()
    // check projectName is there or not
    if (!name) {
      alert("Please select a project Name. You can do this by clicking on 'Create project' from home page ")
      router.push("/home")
    }
    // Check Theme on reload
    if (theme === "light") {
      setThemeColor(themes.light)
    }
    else {
      setThemeColor(themes.dark)
    }
    return () => { }
  }, [imageFile, videoFile])


  const handleSelectedFile = (event: any) => {
    const files = event.target.files;
    const filename = event.target.name;
    var types: Array<string> = [""]
    if (filename === "video") {
      types = ["video/mp4"]
    }
    else if (filename === "image") {
      types = ["image/jpeg", "image/png", "image/jpg"];
    }
    if (files[0] === undefined) return
    if (files && files[0].size < 50000000) {
      if (types.indexOf(files[0].type) >= 0) {
        filename === "video" ? setVideoFile(files[0]) :
          setImageFile(files[0]);
        console.log(files[0]);
      }
      else {
        alert("File can be of these types only " + types)
      }
    } else {
      alert("File size should be smaller than 50mb")
    }
  }


  const filldata = (data: {}) => {
    if (id && projectDescription === "") {
      setProjectDescription(data['data'].description);
      setProjectUrl(data['data'].projectLink);
      setPreviewImage(data['data'].thumbnailurl);
      setPreviewVideo(data['data'].videoUrl);
      setThumbnailUrl(data['data'].thumbnailurl);
      setVideoUrl(data['data'].videoUrl);
      addStack(data['data'].techStack)
      addContent(data['data'].projectContent)
    }
  }


  const handleUploadFile = (path: string, file: File) => {
    return () => {
      if (file) {

        // image upload functionality
        const progressCallback = (progress: number) => {
          setProgress(progress)
        }
        const downloadCallback = (url: string) => {
          switch (path) {
            case "projectVideo":
              setVideoUrl(url)
              setProgress(0)
              break;
            case 'thumbnailUrl':
              setThumbnailUrl(url)
              setProgress(0)
              setPreviewCard(false)
              break;
            default:
              break;
          }
        }
        const imageUpload = new ImageUpload(file, path, progressCallback, downloadCallback)
        imageUpload.upload(name + "-" + phoneNumber)
      } else {
      }
    }
  };

  const handleContent = (type: string, content: string, language: string) => {
    let newList = [...contentList];
    if (cIndex === -1) {
      newList.push({ type: type, content: content, language: language });
    } else {
      newList[cIndex] = { type: type, content: content, language: language };
    }
    addContent(newList);
    setShowAddContent(false);
    changeCindex(-1);
    changeCType("heading");
    changeText("");
  };
  const handleStack = (type: string, content: string, index: number) => {
    let newList = [...stackList];
    if (index === -1) {
      newList.push({ type: type, content: content });
    } else {
      newList[index] = { type: type, content: content };
    }
    addStack(newList);
    setShowAddTech(false);
  };

  // delete function

  const handledelete = async () => {
    const params = {
      session: session
    };
    if (id) {
      setLoader(true);
      const response: ResponseType = await callAPI(
        `project/${id}`, params,
        methods.DELETE
      );
      setLoader(false);
      const { message, data, errors } = response;
      if (message === "success") {
        if (typeof data === "object") {
          alert("deleted");
          router.push("/home")
        }
      } else if (message === "failed") {
        errors.map((errorObject) => {
          const { errorMessage } = errorObject["error"];
          alert(errorMessage);
        });
      } else {
        alert("Some Server error");
      }
    }
  }

  // save||update function

  const handleSave = async () => {

    // setAddUrl(true);

    const params = {
      techStack: JSON.stringify(stackList),
      projectContent: JSON.stringify(contentList),
      title: name,
      videoUrl: videoUrl,
      thumbnailurl: thumbnailUrl,
      description: projectDescription,
      projectLink: projectUrl
    };

    if (id) {
      console.log(params);

      setLoader(true);
      const response: ResponseType = await callAPI(
        `project/${id}`,
        params,
        methods.PUT
      );

      setLoader(false);
      const { message, data, errors } = response;
      if (message === "success") {
        if (typeof data === "object") {
          alert("updated");
          router.push("/home")
        }
      } else if (message === "failed") {
        errors.map((errorObject) => {
          const { errorMessage } = errorObject["error"];
          alert(errorMessage);
        });
      } else {
        alert("Some Server error");
      }
    }
    else {
      setLoader(true);
      const response: ResponseType = await callAPI(
        'project',
        params
      );
      setLoader(false);
      const { message, data, errors } = response;
      if (message === "success") {
        if (typeof data === "object") {
          alert("saved");
          router.push("/home")
        }
      } else if (message === "failed") {
        errors.map((errorObject) => {
          const { errorMessage } = errorObject["error"];
          alert(errorMessage);
        });
      } else {
        alert("Some Server error");
      }
    }

  };
  if (session) {
    return (
      <React.Fragment>
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
              alert("you already on create project screen ")
            }}
          />
          <div
            className={PS.selctType}
            style={{ background: "rgb(20, 21, 21)", marginTop: "70px" }}
          >
            <div style={{ width: "35%" }}>
              <Tooltip
                title="Add Project Description"
                sx={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  setShowDescription(true);
                }}
              >
                <DescriptionIcon />
              </Tooltip>
              <Tooltip
                title="Add Project Link"
                sx={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  setAddUrl(true);
                }}
              >
                <HttpIcon />
              </Tooltip>

              <Tooltip
                title="Add TechStack"
                sx={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  setShowAddTech(true);
                }}
              >
                <AddCardIcon />
              </Tooltip>
              <Tooltip
                title="Add Content"
                sx={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  setShowAddContent(true);
                }}
              >
                <PostAddIcon />
              </Tooltip>
              {previewImage ? <Tooltip
                title="Preview Image"
                sx={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  setPreviewCard(true);
                }}
              >
                <PreviewIcon sx={{ color: "white", cursor: "pointer" }} />
              </Tooltip>
                : <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                  <Tooltip
                    title="Add Thumbnail Image"
                    sx={{ cursor: "pointer", color: "white" }}
                  >
                    <AddPhotoAlternateIcon sx={{ color: "white" }} />
                  </Tooltip>
                </label>
              }
              {/*  */}

              <input type="file" id="imageUpload" name="image"
                onChange={handleSelectedFile} hidden></input>

              <label htmlFor="videoUpload" style={{ cursor: "pointer" }}>
                <Tooltip
                  title="Add Video"
                  sx={{ cursor: "pointer", color: "white" }}
                >
                  <VideoCallIcon sx={{ color: "white" }} />
                </Tooltip>
              </label>
              <input
                type="file"
                id="videoUpload"
                name="video"
                onChange={handleSelectedFile}
                hidden
              ></input>
            </div>
            {id ? <div style={{ width: "20%" }}>
              <Button onClick={handleSave} variant="contained" sx={{ mx: 2 }}>
                Update
              </Button>
              <Button onClick={handledelete} variant="contained" sx={{ mx: 2 }}>
                delete
              </Button>
            </div>
              :
              <div style={{ width: "20%" }}>


                <Button onClick={handleSave} variant="contained" sx={{ mx: 2 }}>
                  Save
                </Button>
              </div>
            }
          </div>
          {progress > 0 && <LinearProgress sx={{ height: "5px" }} variant="determinate" value={progress} />}
          <div className={PS.head}>
            {previewVideo ?
              <div className={PS.video}  >
                <Player
                  playsInline
                  poster={previewImage}
                  src={previewVideo}
                  fluid={false}
                  height={"100%"}
                  width={"100%"}
                >
                  <BigPlayButton position="center" />
                </Player>
                <Button
                  onClick={handleUploadFile('projectVideo', videoFile)}
                  variant="contained"
                  sx={{
                    mx: 2, position: "absolute", top: "90%",
                    right: "0px",
                  }}
                >
                  upload
                </Button>
              </div>
              :
              <div className={PS.video} style={{ border: "2px dotted blue", backgroundColor: themeColor.navbackground }} >
                <label htmlFor="videoUpload" style={{ cursor: "pointer" }}  >
                  <h3 style={{ color: themeColor.text }} >ADD VIDEO +</h3>
                </label>
              </div>
            }
            {stackList.length > 0 ? <div className={PS.bar}>
              {stackList.map(({ type, content }) => {
                return <Bar text={content} type={type} />;
              })}
            </div>
              :
              <div className={PS.bar} style={{ border: "2px dotted blue", backgroundColor: themeColor.navbackground, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => { setShowAddTech(true) }} >
                <h3 style={{ color: themeColor.text }} >ADD TECHSTACK +</h3>
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
                      <EditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          changeCindex(index);
                          setShowAddContent(true);
                          changeCType(object["type"]);
                          changeText(object["content"]);
                        }}
                      />
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
                      <EditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setShowAddContent(true);
                          changeCType(object["type"]);
                          changeCindex(index);
                          changeText(object["content"]);
                        }}
                      />
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
                      <EditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setShowAddContent(true);
                          changeCType(object["type"]);
                          changeCindex(index);
                          changeText(object["content"]);
                        }}
                      />
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
                      <EditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setShowAddContent(true);
                          changeCType(object["type"]);
                          changeCindex(index);
                          changeText(object["content"]);
                        }}
                      />
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
            <div className={PS.content} style={{ border: "2px dotted blue", backgroundColor: themeColor.navbackground, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => { setShowAddContent(true) }} >
              <h3 style={{ color: themeColor.text }} >ADD Content +</h3>
            </div>

          }
          <Footer
            textColor={themeColor.text}
            iconColor={themeColor.iconColor}
            borderColor={themeColor.borderColor}
            backgroundColor={themeColor.navbackground}
          />
        </div>
        {showAddTech && (
          <AddTechStack
            close={() => {
              setShowAddTech(false);
            }}
            name={""}
            id={1}
            save={handleStack}
            saveMore={() => { }}
            stackName={""}
          />
        )}
        {showAddContent && (
          <div className={PS.glass}>
            <div
              className={PS.Box}
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                //   justifyContent: "space-between",
                background: "white",
              }}
            >
              <div
                style={{
                  // borderBottom: "1px solid black",
                  display: "flex",
                  height: "20%",
                  width: "50vw",
                  alignItems: "center",
                  marginTop: "10px",
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
                    marginLeft: "2%",
                  }}
                >
                  Add Text
                  <text
                    style={{
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setShowAddContent(false);
                    }}
                  >
                    <span
                      style={{
                        height: "14px",
                        color: "red",
                        fontWeight: "400",
                        marginRight: "20px",
                      }}
                    >
                      {" "}
                      CLOSE
                    </span>
                  </text>
                </span>
              </div>
              <select
                style={{
                  width: "20%",
                  height: "40px",
                  borderRadius: "5px",
                  marginLeft: "3%",
                  marginTop: "20px",
                }}
                onChange={(event) => {
                  changeCType(event.target.value);
                }}
                value={contentType}
              >
                <option value="code">CodeSnippet</option>
                <option value="heading">Heading</option>
                <option value="subHeading">Sub Heading</option>
                <option value="text">Text</option>
              </select>

              {contentType === "code" && (
                <div
                  className={PS.details}
                  style={{ width: "90%", marginLeft: "3%", marginTop: "20px" }}
                >
                  <input
                    style={{
                      // marginLeft: "2%",
                      height: "30px",
                      width: "60%",
                      borderRadius: "3px",
                      border: "1px solid black",
                    }}
                    onChange={(event) => {
                      changeLanguage(event.target.value);
                    }}
                    value={contentLanguage}
                    type="name"
                    name="Language"
                    placeholder="Enter Language name(eg python,jsx,java)"
                  ></input>
                </div>
              )}
              <div
                className={PS.details}
                style={{ width: "90%", marginTop: "30px" }}
              >
                <textarea
                  name=""
                  id=""
                  cols={70}
                  rows={10}
                  placeholder="Content"
                  value={contentText}
                  onChange={(event) => {
                    changeText(event.target.value);
                  }}
                  style={{
                    marginLeft: "28px",
                    borderRadius: "3px",
                    border: "1px solid black",
                  }}
                ></textarea>
              </div>
              <div style={{ display: "flex", marginTop: "5%" }}>
                <button
                  style={{
                    height: "30px",
                    width: "20%",
                    borderRadius: "5px",
                    cursor: "pointer",
                    background: "#007bff",
                    marginLeft: "3%",
                    marginBottom: "2%",
                    border: "none",
                    color: "white",
                  }}
                  onClick={() => {
                    handleContent(contentType, contentText, contentLanguage);
                  }}
                >
                  Save
                </button>
                <button
                  style={{
                    height: "30px",
                    width: "20%",
                    borderRadius: "5px",
                    cursor: "pointer",
                    background: "#007bff",
                    marginLeft: "2%",
                    marginBottom: "2%",
                    border: "none",
                    color: "white",
                  }}
                >
                  Add-more
                </button>
              </div>
            </div>
          </div>
        )}

        {previewCard && (<Preview
          close={() => {
            setPreviewCard(false);
          }}
          upload={handleUploadFile("thumbnailUrl", imageFile)}
          image={previewImage}
          change={() => {
            setPreviewImage("");
            setPreviewCard(false);
          }}
        />)}

        {addUrl && (<AddUrl
          close={() => {
            setAddUrl(false);
          }}
          save={(url: string) => {
            setProjectUrl(url);
            setAddUrl(false);
          }}
        />)}


        {showDescription && (
          <AddDescription
            close={() => {
              setShowDescription(false);
            }}
            save={(description: string) => {
              setProjectDescription(description);
              setShowDescription(false);
            }}
          />
        )}

        {loader && <Loader />}
      </React.Fragment>
    );
  }
};

const AddTechStack = ({ close, save, saveMore, id, name, stackName }) => {
  const [techStackName, setTechStackName] = useState("");
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
            Add TechStack
            <text
              style={{
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={close}
            >
              <span style={{ height: "14px", color: "red", fontWeight: "400" }}>
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
          <span>TechStack</span>
          <input
            style={{
              marginLeft: "3%",
              height: "30px",
              width: "60%",
              borderRadius: "3px",
              border: "1px solid black",
            }}
            type="name"
            name="TechStackName"
            placeholder="Enter TechStack Name"
            onChange={(event) => {
              setTechStackName(event.target.value);
            }}
          ></input>
        </div>
        <div
          className={PS.details}
          style={{ width: "90%", marginLeft: "3%", color: " black" }}
        >
          <span>Name</span>
          <input
            style={{
              marginLeft: "9%",
              height: "30px",
              width: "60%",
              borderRadius: "3px",
              border: "1px solid black",
            }}
            type="name"
            name="TechStackName"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Enter TechStack Name"
          ></input>
        </div>
        <div style={{ display: "flex" }}>
          <button
            onClick={() => {
              save(techStackName, fieldName, -1);
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
          <button
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
            Add-more
          </button>
        </div>
      </div>
    </div>
  );
};


const AddUrl = ({ close, save }) => {
  const [fieldName, setName] = useState("");

  return (
    <div className={PS.glass}>
      <div
        style={{
          height: "20%",
          width: "20%",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          justifyContent: "space-between",
          background: "white",
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
            Add Website URl(optional)
            <text
              style={{
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={close}
            >
              <span style={{ height: "14px", color: "red", fontWeight: "400" }}>
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
          <span>URl</span>
          <input
            style={{
              marginLeft: "9%",
              height: "30px",
              width: "80%",
              borderRadius: "3px",
              border: "1px solid black",
            }}
            type="name"
            name="TechStackName"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Enter URl"
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

const AddDescription = ({ close, save }) => {
  const [description, setDescription] = useState("");

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
          height: "auto",
          width: "40%",
        }}
      >
        <div
          style={{
            // borderBottom: "1px solid black",
            display: "flex",
            height: "20%",
            width: "100%",
            alignItems: "center",
            marginTop: "2%",
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
            Add Project Description
            <text
              style={{
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={close}
            >
              <span style={{ height: "14px", color: "red", fontWeight: "400" }}>
                {" "}
                CLOSE
              </span>
            </text>
          </span>
        </div>

        <div
          className={PS.details}
          style={{
            width: "90%",
            marginLeft: "3%",
            marginTop: "3%",
            marginBottom: "3%",
            color: " black",
          }}
        >
          <textarea
            rows={10}
            cols={10}
            style={{
              // marginLeft: "28px",
              height: "90%",
              width: "100%",
              borderRadius: "3px",
              border: "1px solid black",
            }}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            name="Description"
            placeholder="Enter Description"
          ></textarea>
        </div>

        <div style={{ display: "flex" }}>
          <button
            onClick={() => {
              save(description);
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

const Preview = ({ close, upload, image, change }) => {

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
          height: "auto",
          width: "450px",
        }}
      >
        <div
          style={{
            // borderBottom: "1px solid black",
            display: "flex",
            height: "20%",
            width: "100%",
            alignItems: "center",
            marginTop: "2%",
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
            Preview
            <text
              style={{
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={close}
            >
              <span style={{ height: "14px", color: "red", fontWeight: "400" }}>
                {" "}
                CLOSE
              </span>
            </text>
          </span>
        </div>

        <div
          className={PS.details}
          style={{
            height: "250px",
            width: "400px",
            marginLeft: "3%",
            marginTop: "3%",
            marginBottom: "3%",
            color: " black",
          }}
        >
          <img src={image} style={{ height: "100%", width: "100%" }} />
        </div>

        <div style={{ display: "flex" }}>
          <button
            onClick={upload}
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
            upload
          </button>
          <button
            onClick={change}
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
            delete
          </button>
        </div>
      </div>
    </div>
  );
};



export default ProjectScreen;
