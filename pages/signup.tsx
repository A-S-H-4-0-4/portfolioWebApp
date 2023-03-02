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
import { useRouter } from 'next/router';
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


import { callAPI, methods } from "../api/api";


const styles = {
  marginTop: "50px",
  borderRadius: "10px",
  boxShadow: "1px 1px 1px 1px grey"
}



export default function SignUp() {

  const { session } = useWrapper();
  const [loader, setLoader] = useState(false)
  const router = useRouter()

  const [number, setNumber] = useState("");

  const handlefields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    let number = value
    if (number.length <= 10) {
      setNumber(number);
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget);
    let fname = value.get('firstName');
    let lname = value.get('lastName');
    let name = fname + ' ' + lname;
    let email = value.get('email');
    let password = value.get('password');
    let mobileNumber = value.get('mobileNumber');
    if (number.length === 10) {
      const params = {
        name,
        phoneNumber: mobileNumber,
        email,
        password
      };
      setLoader(true);
      const response: ResponseType = await callAPI("signin", params);
      setLoader(false);
      const { message, errors } = response;
      if (message === "success") {
        router.push("/signin")
      }
      else if (message === "failed") {
          return (<AlertDialog heading="Error" text={errors} />);
      }
      else {
        return (<AlertDialog heading="Error" text="Some Server error" />);
      }
    }
    else {
      return (<AlertDialog heading="Error" text="please enter valid number " />);
    }
  }
  if (!session) {
    return (
      <div style={{ backgroundColor: "white", height: "100vh", width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Head>
          <title>SignUp</title>
        </Head>
        <ThemeProvider theme={theme}>
          <img src={logo} style={{ height: "150px", width: "350px", marginTop: "50px" }} />
          <Container component="main" maxWidth="xs" style={styles}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'hotpink' }}>
                <AccountBoxIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{ color: 'black' }}>
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} method="post" >
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
                      value={number}
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
                  <Grid item >
                    <Link href="signin" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
        {loader && <Loader />}
      </div>
    );
  }
  else {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h2>You are logged in <a style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { router.push("/home") }} > Go to Home</a> </h2>
      </div>
    )
  }
}