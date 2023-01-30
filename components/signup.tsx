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


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


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



import { callAPI } from "../api/api";


export default function SignUp() {
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

  


  const handleSave = async () => {
    // setLoader(true);

    let {
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
    } = fields;
    const name = firstName + ' ' + lastName
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
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSave}  method = "POST"  >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handlefields}
                  value={fields.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handlefields}
                  value={fields.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobileNumber"
                  label="Phone No."
                  name="mobileNumber"
                  autoComplete="mobileNumber"
                  onChange={handlefields}
                  value={fields.mobileNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handlefields}
                  value={fields.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlefields}
                  value={fields.password}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item  style={{ color: "black" }}>

                Already have an account? Sign in

              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}