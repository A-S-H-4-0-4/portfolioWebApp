import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router'
import { blue, pink } from '@mui/material/colors'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';





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

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 0, 0)',
    }

  },
});

// images
const banner = "/images/banner.jpg";

import { callAPI } from "../api/api";


export default function Profile() {
  const router = useRouter()

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




  const handleSaveParty = async () => {
    // setLoader(true);

    let {
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
    } = fields;
    const name = firstName + lastName
    if (name.trim() !== "") {
      if (mobileNumber.trim() !== "") {
        if (fields.mobileNumber.length == 10) {
          if (email.trim() !== "") {
            const params: ApiData = {
              name,
              phoneNumber: mobileNumber,
              email,
              password
            };

            const response: ResponseType = await callAPI("signin", params);

            const { message, errors } = response;
            if (message === "success") {
              alert(
                "Details saved successfully"
              );
            } else if (message === "failure") {
              errors.map((errorObject) => {
                const { errorMessage } = errorObject;
                alert(errorMessage);
              });
            } else {
              alert("Some Server error");
            }

          }
          else {
            alert("Please enter a valid email");
          }
        }
        else {
          alert("Please enter a valid mobile number");
        }



      }
      else {
        alert("Please enter a valid mobile number");
      }
    } else {
      alert("Please enter a valid Name");
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'hotpink' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: 'black' }}>
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSaveParty} >
            <Grid container spacing={2}>
              <Grid item xs={12} style = {{display:"flex",alignItems: "center"}} >
                <Typography  variant="h5" style={{ color: 'black' , marginRight:"10px"}} >
                  Add Profile Image:
                </Typography>
                <label htmlFor="upload1" style={{cursor:"pointer"}}>
                  <AccountCircleIcon sx={{color:"black",fontSize:"60px"}} />
                </label>
                <input
                  type="file"
                  id="upload1"
                  hidden
                ></input>
              </Grid>
              <Grid item xs={12} style = {{display:"flex",alignItems: "center"}} >
                <Typography  variant="h5" style={{ color: 'black' , marginRight:"10px"}} >
                  Add Banner Image:
                </Typography>
                <label htmlFor="upload1" style={{cursor:"pointer"}}>
                  <img src={banner} style={{height:"100px"}} />
                </label>
                <input
                  type="file"
                  id="upload1"
                  hidden
                ></input>
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
    </ThemeProvider>
  );
}