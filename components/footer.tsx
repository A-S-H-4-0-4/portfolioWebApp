// styles
import fotr from "../styles/components/footer.module.css";
// react
import React, { useEffect, useState } from "react";

// router
import { useRouter } from "next/router";


import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
// icons
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// images
const profileImage = "/images/banner.jpg"

const Footer = () => {

  const [matches, setMatches] = useState(false);

  if (typeof window !== "undefined") {
    window.matchMedia("(min-width: 900px)").matches;
  }

  useEffect(() => {
    window
      .matchMedia("(max-width: 900px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="" style={{ textDecoration: "none" }}>
          Ash.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const router = useRouter()

  return (
    <React.Fragment>
      {matches == false && <div className={fotr.box} style={{ backgroundColor: "white", height: "80px", width: "100%", display: "flex", alignItems: "center", marginTop:"20px"}}>

        <div className={fotr.profileImg}>
          <img src={profileImage} style={{ height: "60px", width: "60px", borderRadius: '50%', objectFit: "cover" }} />
          <h3 style={{ marginLeft: "10px", alignItems: "center", color: "black" }}>Asyush Bhardwaj</h3>
        </div>
        <div className={fotr.bordr} style={{
          background: "black",
          width: "2px",
          height: "70%"
        }}></div>
        <Copyright sx={{ mt: 4, mb: 4, marginLeft: "20px", color: "black" }} />


        <div style={{ marginLeft: "45%", width: "8%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          <InstagramIcon sx={{ color: "black" }} />
          <MailOutlineOutlinedIcon sx={{ color: "black" }} />
          <GitHubIcon sx={{ color: "black" }} />
          <LinkedInIcon sx={{ color: "black" }} />
        </div>
      </div>}

      {matches == true && <div className={fotr.box} style={{ backgroundColor: "red", height: "200px", width: "100%", display: "flex",  flexDirection: "column", alignItems: "center",justifyContent: "center",marginTop:"20px"}}>

        <div className={fotr.profileImg}>
          <img src={profileImage} style={{ height: "60px", width: "60px", borderRadius: '50%', objectFit: "cover",border: "1px solid black" }} />
          <h3 style={{ marginLeft: "10px", alignItems: "center", color: "black" }}>Asyush Bhardwaj</h3>
        </div>

        <Copyright sx={{ mt: 2, mb: 3, marginLeft: "20px", color: "black", fontWeight: "bold"}} />


        <div style={{  width: "13%", display: "flex", alignItems: "center", justifyContent: "space-around", }}>
          <InstagramIcon sx={{ color: "black" }} />
          <MailOutlineOutlinedIcon sx={{ color: "black" }} />
          <GitHubIcon sx={{ color: "black" }} />
          <LinkedInIcon sx={{ color: "black" }} />
        </div>
      </div>}

    </React.Fragment>
  )
}


export default Footer