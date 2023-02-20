import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { blue, pink } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateNewFolderSharpIcon from "@mui/icons-material/CreateNewFolderSharp";



// styles
import UP from "../styles/userProfile.module.css";

// theme
import { themes } from "../lib/theme";


// context
import { useWrapper } from "../lib/contextApi";



interface ResponseType {
  message: string;
  data: {};
  errors: [];
}

const muitheme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 0, 0)",
    },
  },
});

// image upload
import { ImageUpload } from "../lib/fileUpload";


// components
import Loader from "./loader";

// images
const banner = "/images/banner.jpg";
// icons
const logo = "/icons/logo.png";

import { callAPI, methods } from "../api/api";
import { LinearProgress } from "@mui/material";

const Profile = ({ phoneNumber, callBack }) => {
  const router = useRouter();

  const { theme } = useWrapper();
  const [themeColor, setThemeColor] = useState(themes.light);
  const [bannerUrl, setBannerUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [progress, setProgress] = useState(0)
  const [previewBannerImage, setPreviewBannerImage] = useState<string>("");
  const [previewProfileImage, setPreviewProfileImage] = useState<string>("");
  const [previewResume, setPreviewResume] = useState<string>("");
  const [loader, setLoader] = useState(false)

  const [fields, setFields] = useState({
    instaGram: "",
    gitHub: "",
    gitLab: "",
    description: "",
    homePageTitle: "",
    linkedIn: "",
    twitter: "",
  });

  const componentDidMount = async () => {
    setLoader(true);
    const response: ResponseType = await callAPI(
      'profile',
    );
    setLoader(false);
    const { message, data, errors } = response;
    if (message === "success") {
      if (typeof data === "object") {
        filldata(data);
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


  useEffect(() => {
    componentDidMount();

    if (theme === "light") {
      setThemeColor(themes.light)
    }
    else {
      setThemeColor(themes.dark)
    }
    return () => { }
  }, [])

  const handlefields = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = event;
    const { name, value } = target;
    let newFields = { ...fields, [name]: value };
    setFields(newFields);
  };


  const filldata = (data: {}) => {
    if (data['data'] !== undefined) {
      if (fields.homePageTitle === "") {
        let newFields = {
          gitHub: data['data'].gitHub,
          description: data['data'].description,
          gitLab: data['data'].gitLab,
          homePageTitle: data['data'].homePageTitle,
          instaGram: data['data'].instaGram,
          linkedIn: data['data'].linkedIn,
          twitter: data['data'].twitter
        }
        setFields(newFields);
        setPreviewBannerImage(data['data'].bannerImage)
        setPreviewProfileImage(data['data'].userImage)
        setPreviewResume(data['data'].resume)
        setBannerUrl(data['data'].bannerImage)
        setProfileImageUrl(data['data'].userImage)
        setResumeUrl(data['data'].resume)
      }
    }
  }



  const handleSave = async () => {

    // setAddUrl(true);

    const params = {
      bannerImage: bannerUrl,
      userImage: profileImageUrl,
      instaGram: fields.instaGram,
      gitHub: fields.gitHub,
      gitLab: fields.gitLab,
      description: fields.description,
      homePageTitle: fields.homePageTitle,
      linkedIn: fields.linkedIn,
      twitter: fields.twitter,
      resume: resumeUrl
    };

    setLoader(true);
    const response: ResponseType = await callAPI(
      'profile',
      params,
      methods.PUT
    );
    setLoader(false);
    const { message, data, errors } = response;
    if (message === "success") {
      if (typeof data === "object") {
        alert("saved");
        // router.push("/home")
      }
    } else if (message === "failed") {
      errors.map((errorObject) => {
        const { errorMessage } = errorObject["error"];
        alert(errorMessage);
      });
    } else {
      alert("Some Server error");
    }


  };


  const handleSelectedFile = (event: any) => {
    const files = event.target.files;
    const filename = event.target.name;
    var types: Array<string> = [""]
    if (filename === "resumeFile") {
      types = ["application/pdf"]
    }
    else if (filename === "bannerImage" || filename === "profileImage") {
      types = ["image/jpeg", "image/png", "image/jpg"];
    }
    if (files[0] === undefined) return
    if (files && files[0].size < 20000000) {
      if (types.indexOf(files[0].type) >= 0) {
        handleUploadFile(filename, files[0])
        if (filename === "bannerImage") {
          const reader = new window.FileReader();
          reader.onloadend = () => {
            setPreviewBannerImage(reader.result as string)
          }
          reader.readAsDataURL(files[0]);
        }
        if (filename === "profileImage") {
          const reader = new window.FileReader();
          reader.onloadend = () => {
            setPreviewProfileImage(reader.result as string)
          }
          reader.readAsDataURL(files[0]);
        }
        if (filename === "resumeFile") {
          const reader = new window.FileReader();
          reader.onloadend = () => {
            setPreviewResume(reader.result as string)
          }
          reader.readAsDataURL(files[0]);
        }
      }
      else {
        alert("File can be of these types only " + types)
      }
    } else {
      alert("File size should be smaller than 20mb")
    }




  }



  const handleUploadFile = (path: string, file: File) => {
    if (file) {

      // image upload functionality
      const progressCallback = (progress: number) => {
        setProgress(progress)
      }
      const downloadCallback = (url: string) => {
        console.log(url);
        switch (path) {
          case "profileImage":
            setProfileImageUrl(url)
            setProgress(0)
            break;
          case 'bannerImage':
            setBannerUrl(url)
            setProgress(0)
            break;
          case 'resumeFile':
            setResumeUrl(url)
            setProgress(0)
            break;
          default:
            break;
        }
      }
      const imageUpload = new ImageUpload(file, path, progressCallback, downloadCallback)
      imageUpload.upload(phoneNumber)
    } else {
    }

  };

  return (
    <React.Fragment>
      <div className={UP.glass} >

        <div className={UP.container} style={{ backgroundColor: "white", display: "flex", alignItems: "center" }}>
          {progress > 0 && <div><LinearProgress sx={{ height: "10px" }} variant="determinate" value={progress} color="primary" /></div>}
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #ccc",
            }}
          >

            <div style={{ height: "70px", display: "flex", alignItems: "center", marginLeft: "10px", cursor: "pointer", color: "black" }} > <h3>Edit Profile</h3> </div>
            <div style={{ height: "70px", width: "30%", display: "flex", alignItems: "center", justifyContent: "space-evenly", cursor: "pointer" }} >
              <Button variant="outlined" onClick={handleSave} >
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={callBack} >
                Cancel
              </Button>
            </div>
          </div>
          <img src={logo} style={{ height: "150px", width: "350px", marginTop: "20px", marginBottom: "50px" }} />


          <div className={UP.head} >
            <label htmlFor="banner" >
              <div style={{ height: '300px', width: '100%', backgroundColor: themeColor.background, display: 'flex', alignItems: 'center', justifyContent: 'center', color: themeColor.text, border: "1px solid #ccc", cursor: "pointer" }}>
                {previewBannerImage === "" ? <h2>ADD BANNER +</h2> : <img src={previewBannerImage} style={{ height: "100%", width: "100%" }} />}
                {/*  */}
              </div>
            </label>
            <input
              type="file"
              id="banner"
              name="bannerImage"
              onChange={handleSelectedFile}
              hidden
            ></input>
            <label htmlFor="profile" >
              <div className={UP.profile} style={{ backgroundColor: themeColor.background, cursor: "pointer" }} >
                {previewProfileImage === "" ? <AccountCircleIcon
                  sx={{ color: themeColor.text, fontSize: "120px" }}
                /> : <img src={previewProfileImage} style={{ height: "120px", width: "120px", borderRadius: "100px" }} />}
              </div>
            </label>
            <input
              type="file"
              id="profile"
              name="profileImage"
              onChange={handleSelectedFile}
              hidden
            ></input>
          </div>


          <ThemeProvider theme={muitheme}  >
            <Container component="main" maxWidth="xs" sx={{ marginTop: "40px", marginBottom: "40px" }} >
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="gitHub"
                        label="Git Hub userName"
                        name="gitHub"
                        onChange={handlefields}
                        value={fields.gitHub}
                        style={{ fontSize: "18px" }}
                      // value={fields.mobileNumber}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="linkedIn"
                        label="LinkedIn id"
                        name="linkedIn"
                        placeholder="eg: https://www.linkedin.com/in/abc-72381ujy3u"
                        onChange={handlefields}
                        style={{ fontSize: "18px" }}
                        value={fields.linkedIn}
                      // value={fields.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="gitLab"
                        label="Git Lab userName"
                        type="gitLab"
                        id="gitLab"
                        onChange={handlefields}
                        style={{ fontSize: "18px" }}
                        value={fields.gitLab}
                      // value={fields.password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="instaGram"
                        label="Instagram UserName"
                        type="instaGram"
                        id="instaGram"
                        onChange={handlefields}
                        style={{ fontSize: "18px" }}
                        value={fields.instaGram}
                      // value={fields.password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="twitter"
                        label="Twitter UserName"
                        type="twitter"
                        id="twitter"
                        onChange={handlefields}
                        style={{ fontSize: "18px" }}
                        // value={fields.password}
                        value={fields.twitter}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="homePageTitle"
                        label="Home Page Message "
                        placeholder="'eg: Welcome to my portal' "
                        type="homePageTitle"
                        id="homePageTitle"
                        style={{ fontSize: "18px" }}
                        onChange={handlefields}
                        value={fields.homePageTitle}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <textarea
                        name="description"
                        id="description"
                        cols={70}
                        rows={10}
                        placeholder="Add Bio"
                        style={{ fontSize: "18px" }}
                        onChange={handlefields}
                        value={fields.description}
                      ></textarea>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography
                        variant="h5"
                        style={{ color: "black", marginRight: "10px" }}
                      >
                        Add Resume file:
                      </Typography>

                      {previewResume === "" ? <Button variant="contained" color="info" component="label" >
                        Add resume
                        <input hidden type="file" name="resumeFile" onChange={handleSelectedFile} />
                      </Button> : <div style={{ height: "200px", width: "400px", position: "relative" }} ><iframe src={previewResume} style={{ height: "100%", width: "100%" }} />  <Button variant="contained" color="info" component="label" style={{ position: "absolute", top: '80%', right: "0" }} >
                        Change
                        <input hidden type="file" name="resumeFile" onChange={handleSelectedFile} />
                      </Button> </div>}

                    </Grid>

                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>

      </div>
      {loader && <Loader />}
    </React.Fragment >
  );
}


export default Profile