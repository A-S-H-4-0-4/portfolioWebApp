import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';


import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Router, { useRouter } from 'next/router'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// component
import Loader from "../components/loader";
import AlertDialog from "../components/alertBox";

// logo
const logo = "icons/logo.png";

// next head
import Head from 'next/head';


// context api
import { useWrapper } from "../lib/contextApi";


import { callAPI } from "../api/api";
import { saveData } from '../local/storage';


declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({

  palette: {
    primary: {
      main: 'rgb(0, 0, 0)',
    },
    secondary: {
      main: green[500],
    },
  },


});


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        Portfolio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface ResponseType {
  message: string;
  data: {};
  errors: [];
}




export default function SignIn() {

  const { session } = useWrapper()

  const [loader, setLoader] = useState(false)
  const [fields, setfields] = useState({ head: "", text: "" })
  const router = useRouter()
  const styles = {
    marginTop: "50px",
    borderRadius: "10px",
    boxShadow: "1px 1px 1px 1px grey"
  }




  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget);
    const params = {
      phoneNumber: value.get('mobileNumber'),
      password: value.get('password'),
    };
    setLoader(true);
    const response: ResponseType = await callAPI("login", params);
    console.log(response);

    setLoader(false);
    const { message, data, errors } = response;
    if (message === "success") {
      if (typeof data === "object") {
        if (saveData("session", data['sessionKey'])) {
          router.push("/home")
          return
        }


        // "Error!!","Error in login please try again ):")
      }
    } else if (message === "failed") {
      errors.map((errorObject) => {
        return (<AlertDialog heading="Error!!" text={errorObject["error"]} />)
      });
    } else {
      return (<AlertDialog heading="Error!!" text="There in error in server please try again later ):" />)
    }
  };

  if (!session) {
    return (
      <React.Fragment>
        <Head>
          <title>User | Signin</title>
        </Head>
        <div style={{ backgroundColor: "white", height: "100vh", width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
          <img src={logo} style={{ height: "150px", width: "350px", marginTop: "50px" }} />
          <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="xs" style={styles}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'hotpink' }}>
                  <AccountBoxIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{ color: 'black' }}>
                  Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    required
                    fullWidth
                    id="mobileNumber"
                    label="Phone No."
                    name="mobileNumber"
                    autoComplete="mobileNumber"

                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"

                  // color="primary"
                  />
                  {/* <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    {/* <Grid item xs>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Grid> */}
                    <Grid item >
                      <Link href="signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Container>
          </ThemeProvider>
        </div>
        {loader && <Loader />}
        {/* {alert && <AlertDialog heading={fields.head} text = {fields.text} />} */}
      </React.Fragment>
    );
  }
  else {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h2>You are logged in <a style={{ color: "blue", textDecoration: "underline",cursor:"pointer" }} onClick={() => { router.push("/home") }} > Go to Home</a> </h2>
      </div>
    )
  }
}