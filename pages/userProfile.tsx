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


// theme
import { themes } from "../lib/theme";


// context
import { useWrapper } from "../lib/contextApi";


interface ApiData {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface ResponseType {
  message: string;
  errors: [];
}

const muitheme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 0, 0)",
    },
  },
});

// components
import ResponsiveAppBar from "../components/navbar";
import Footer from "../components/footer";

// images
const banner = "/images/banner.jpg";
// icons
const logo = "/icons/logo.png";

import { callAPI } from "../api/api";
import { TextareaAutosize } from "@mui/material";

export default function Profile() {
  const router = useRouter();

  const { session, theme, themeCallback } = useWrapper();
  const [themeColor, setThemeColor] = useState(themes.light);

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });

  const handlefields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    let newFields = { ...fields, [name]: value };
    setFields(newFields);
  };

  return (
    <div style={{ backgroundColor: "white", height: "auto", width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
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
        createProject={() => { }}
      />
      <img src={logo} style={{ height: "150px", width: "350px", marginTop: "50px" }} />
      {/* <ThemeProvider theme={muitheme}> */}
        <Container component="main" maxWidth="xs">
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
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="h5"
                    style={{ color: "black", marginRight: "10px" }}
                  >
                    Add Profile Image:
                  </Typography>
                  <label htmlFor="upload1" style={{ cursor: "pointer" }}>
                    <AccountCircleIcon
                      sx={{ color: "black", fontSize: "60px" }}
                    />
                  </label>
                  <input type="file" id="upload1" hidden></input>
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
                    Add Banner Image:
                  </Typography>
                  <label htmlFor="upload1" style={{ cursor: "pointer" }}>
                    <img src={banner} style={{ height: "100px" }} />
                  </label>
                  <input type="file" id="upload1" hidden></input>
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
                  <label htmlFor="upload2" style={{ cursor: "pointer" }}>
                    <CreateNewFolderSharpIcon
                      sx={{ color: "black", fontSize: "60px" }}
                    />
                  </label>
                  <input type="file" id="upload2" hidden></input>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="github"
                    label="Git Hub userName"
                    name="github"
                    onChange={handlefields}
                  // value={fields.mobileNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="linkedin"
                    label="LinkedIn id"
                    name="linkedin"
                    onChange={handlefields}
                  // value={fields.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="gitlab"
                    label="Git Lab userName"
                    type="gitlab"
                    id="gitlab"
                    onChange={handlefields}
                  // value={fields.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="instagram"
                    label="Instagram UserName"
                    type="instagram"
                    id="instagram"
                    onChange={handlefields}
                  // value={fields.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="title"
                    label="Home Page Title"
                    type="title"
                    id="title"
                    onChange={handlefields}
                  />
                </Grid>

                <Grid item xs={12}>
                  <textarea
                    name=""
                    id=""
                    cols={70}
                    rows={10}
                    placeholder="Home Page Description"
                  ></textarea>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      {/* </ThemeProvider> */}
      <Footer
        textColor={themeColor.text}
        iconColor={themeColor.iconColor}
        borderColor={themeColor.borderColor}
        backgroundColor={themeColor.navbackground}
      />
    </div>
  );
}
