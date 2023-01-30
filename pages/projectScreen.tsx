// styles
import PS from "../styles/projectScreen.module.css";

// react
import React, { useEffect, useState } from "react";
import Highlight from "react-highlight";

//  firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// components
import ResponsiveAppBar from "../components/navbar";
import Footer from "../components/footer";
import Bar from "../components/bar";

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
import { storage } from "../firebaseConfig";
// Video player
import "node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
import Plyr from "plyr-react"
import "plyr-react/plyr.css"

// muit tooltip
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

const ProjectScreen = () => {
  // State Management
  const [showAddTech, setShowAddTech] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const [contentList, addContent] = useState([]);
  const [stackList, addStack] = useState([]);
  const [contentType, changeCType] = useState("heading");
  const [contentText, changeText] = useState("");
  const [contentLanguage, changeLanguage] = useState("text");
  const [cIndex, changeCindex] = useState(-1);
  const [sIndex, changeSindex] = useState(-1);
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const handleSelectedFile = (event: any) => {
    const files = event.target.files;
    console.log(files);

    if (files && files[0].size < 20000000) {
      setImageFile(files[0]);

      console.log(files[0]);
    } else {
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => { },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url);
          });
        }
      );
    } else {
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

  //   const AddContent = () => {

  //     return
  //   };

  return (
    <React.Fragment>
      <div className={PS.screen} style={{ background: "white" }}>
        <ResponsiveAppBar
          callBack={() => { }}
          color={"black"}
          colour={"white"}
        />
        <div className={PS.selctType} style={{ background: "rgb(20, 21, 21)" }}>
          <Button
            onClick={handleUploadFile}
            variant="contained" sx={{ mx: 2 }}>Contained</Button>
          <div style={{ width: "20%" }}>
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

            <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
              <Tooltip
                title="Add Thumbnail Image"
                sx={{ cursor: "pointer", color: "white" }}
              >
                <AddPhotoAlternateIcon
                  sx={{ color: "white" }}
                />
              </Tooltip>
            </label>
            <input type="file" id="imageUpload" hidden></input>


            <label htmlFor="videoUpload" style={{ cursor: "pointer" }}>
              <Tooltip
                title="Add Video"
                sx={{ cursor: "pointer", color: "white" }}
              >
                <VideoCallIcon
                  sx={{ color: "white" }}
                />
              </Tooltip>
            </label>
            <input type="file" id="videoUpload" onChange={handleSelectedFile} hidden></input>

          </div>
        </div>

        <div className={PS.head}>
          <div className={PS.video}>
            <Player
              playsInline
              poster="/images/banner.jpg"
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
           
            
          </div>
          <div className={PS.bar}>
            {stackList.map(({ type, content }) => {
              return <Bar text={content} type={type} />;
            })}
          </div>
        </div>

        <div className={PS.content}>
          {contentList.map((object: any, index: number) => {
            let renderContent = <div style={{ color: 'black' }}></div>;
            switch (object["type"]) {
              case "heading":
                renderContent = (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: 'black',
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
                      color: 'black',
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
                      color: 'black',
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
              case "snippet":
                renderContent = (
                  <div
                    style={{ display: "flex", justifyContent: "space-between",color: "black" }}
                  >
                    <div style={{ width: "60%" }}>
                    <CodeBlockDefaultExample language = {object["language"]} text = {object["content"]}  theme='dark' />
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
        <Footer />
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
              <option value="snippet">CodeSnippet</option>
              <option value="heading">Heading</option>
              <option value="subHeading">Sub Heading</option>
              <option value="text">Text</option>
            </select>

            {contentType === "snippet" && (
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
                rows={10}
                cols={10}
                style={{
                  marginLeft: "28px",
                  height: "30px",
                  width: "60%",
                  borderRadius: "3px",
                  border: "1px solid black",
                }}
                onChange={(event) => {
                  changeText(event.target.value);
                }}
                value={contentText}

                name="Content"
                placeholder="Enter Text"
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
                  handleContent(contentType, contentText,contentLanguage);
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
    </React.Fragment>
  );
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

        <div className={PS.details} style={{ width: "90%", marginLeft: "3%", color: " black", }}>
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
        <div className={PS.details} style={{ width: "90%", marginLeft: "3%", color: " black" }}>
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

export default ProjectScreen;
