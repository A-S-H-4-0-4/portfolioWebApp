// styles
import fotr from "../styles/components/footer.module.css";
// react
import React, { useEffect, useState } from "react";

// router
import { useRouter } from "next/router";

// nextLink
import Link from 'next/link'

import Typography from '@mui/material/Typography';

// icons
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// images
const profileImage = "/images/banner.jpg"


// context api
import { useWrapper } from "../lib/contextApi";

const Footer = ({ textColor, iconColor, borderColor, backgroundColor,data }) => {

  const [matches, setMatches] = useState(false);
  

  if (typeof window !== "undefined") {
    window.matchMedia("(min-width: 1100px)").matches;
  }

  useEffect(() => {
    window
      .matchMedia("(max-width: 1100px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  function Copyright(props: any) {
    return (
      <Typography variant="body2" align="center" {...props} style={{ color: textColor }} >
        {'Copyright © '}
        <Link href="" style={{ textDecoration: "none", color: textColor }}>
          Portfolio
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const router = useRouter()

  return (
    <React.Fragment>
      {matches == false && <div className={fotr.box} style={{ backgroundColor: backgroundColor, height: "80px", width: "100%", display: "flex", alignItems: "center", marginTop: "100px" }}>

        <div className={fotr.profileImg} style={{ width: "15%" }} >

          {data['userImage'] !== "" ? <img src={data['userImage']} style={{ height: "60px", width: "60px", borderRadius: '50%', objectFit: "cover", border: "1px solid black" }} />
            : <AccountCircleIcon sx={{ fontSize: "60px" }} />}
          <h3 style={{ marginLeft: "10px", alignItems: "center", color: textColor }}>{data['user'] !== undefined ? data['user'].name : <>userName</>}</h3>
        </div>
        <div className={fotr.bordr} style={{
          background: borderColor,
          width: "2px",
          height: "70%"
        }}></div>
        <Copyright sx={{ mt: 4, mb: 4, marginLeft: "20px" }} />

        {data !== undefined &&
          <div style={{ marginLeft: "55%", width: "8%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            {data['instaGram'] !== "" &&
              <InstagramIcon sx={{ color: iconColor, cursor: "pointer" }} onClick={() => { router.push(`https://www.instagram.com//${data['instaGram']}`) }} />
            }
            {data['twitter'] !== "" &&
              <TwitterIcon sx={{ color: iconColor, cursor: "pointer" }} onClick={() => { router.push(`https://www.twitter.com//${data['twitter']}`) }} />
            }
            {data['gitHub'] !== "" &&
              <GitHubIcon sx={{ color: iconColor, cursor: "pointer" }} onClick={() => { router.push(`https://www.github.com//${data['gitHub']}`) }} />
            }
            {data['linkedIn'] !== "" &&
              <LinkedInIcon sx={{ color: iconColor, cursor: "pointer" }} onClick={() => { router.push(data['linkedIn']) }} />
            }
          </div>}
      </div>}
      {matches == true && <div className={fotr.box} style={{ backgroundColor: backgroundColor, height: "200px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
        <div className={fotr.profileImg}>
          {data['userImage'] !== "" ? <img src={data['userImage']} style={{ height: "60px", width: "60px", borderRadius: '50%', objectFit: "cover", border: "1px solid black" }} />
            : <AccountCircleIcon sx={{ fontSize: "60px" }} />}
          <h3 style={{ marginLeft: "10px", alignItems: "center", color: textColor }}>{data['user'] !== undefined ? data['user'].name : <>userName</>}</h3>
        </div>
        <Copyright sx={{ mt: 2, mb: 3, marginLeft: "30px", fontWeight: "bold" }} />
        {data !== undefined && <div style={{ width: "50%", display: "flex", alignItems: "center", marginLeft: "30px", justifyContent: "space-around", }}>
          {data['instaGram'] !== "" &&
            <InstagramIcon sx={{ color: iconColor, cursor: "pointer" }} onClick={() => { router.push(`https://www.instagram.com//${data['instaGram']}`) }} />
          }
          {data['twitter'] !== "" &&
            <TwitterIcon sx={{ color: iconColor, cursor: "pointer" }} onClick={() => { router.push(`https://www.twitter.com//${data['twitter']}`) }} /> 
          }
          {data['gitHub'] !== "" &&
            <GitHubIcon sx={{ color: iconColor, cursor: "pointer" }} onClick={() => { router.push(`https://www.github.com//${data['gitHub']}`) }} />
          }
          {data['linkedIn'] !== "" &&
            <LinkedInIcon sx={{ color: iconColor, cursor: "pointer" }} onClick={() => { router.push(data['linkedIn']) }} />
          }
        </div>}
      </div>}

    </React.Fragment>
  )
}


export default Footer