import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// styles
import PS from "../styles/projectScreen.module.css";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
// router
import { useRouter } from "next/router";

// context api
import { useWrapper } from "../lib/contextApi";
// logo
const logo = "icons/logo.png";


const ResponsiveAppBar = ({ color, colour, callBack, createProject }) => {
  const router = useRouter();
  const { sessionCallback } = useWrapper();
  const [showName, setShowName] = React.useState(false);
  const [pathName, setPathName] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  React.useEffect(() => {
    if (router.pathname === '/home'||router.pathname === '/userProfile') {
      setPathName(true)
    }
  }, []);

  return (
    <React.Fragment>
      <AppBar
        position="static"
        style={{
          width: "100%",
          backgroundColor: color,
          position: "fixed",
          zIndex: "10",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: colour,
                textDecoration: "none",
              }}
            >
              PORTFOLIO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: colour }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/home");
                  }}
                >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                {pathName && <MenuItem
                  onClick={() => {
                    router.push("/projectScreen");
                  }}
                >
                  <Typography textAlign="center" onClick={createProject} >Create Project</Typography>
                </MenuItem>
                }
                <MenuItem>
                  <Typography textAlign="center">Resume</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push("/contact");
                  }}
                >
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
                {pathName && <MenuItem
                  onClick={() => { setShowName(true) }}
                >
                  <Typography textAlign="center">Share</Typography>
                </MenuItem>
                }
                <MenuItem onClick={callBack}>
                  <DarkModeIcon sx={{ color: "black" }} />
                </MenuItem>
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: colour,
                textDecoration: "none",
              }}
            >
              PORTFOLIO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => {
                  router.push("/home");
                }}
                sx={{ my: 2, color: colour, display: "block" }}
              >
                Home
              </Button>

              <Button
                // onClick={() => { router.push("/home") }}
                sx={{ my: 2, color: colour, display: "block" }}
              >
                Resume
              </Button>

              <Button
                onClick={() => {
                  router.push("/contact");
                }}
                sx={{ my: 2, color: colour, display: "block" }}
              >
                Contact
              </Button>
              {pathName && <Button
                sx={{ my: 2, color: colour, display: "block" }}
                onClick={createProject}
              >
                Create Project
              </Button>
              }
              {pathName &&
                <Button
                  sx={{ my: 2, color: colour, display: "block" }}
                  onClick={() => { setShowName(true) }}
                >
                  Share
                </Button>
              }

              <Button
                onClick={callBack}
              // sx={{ my: 2, color: '#121212', display: 'block' }}
              >
                <DarkModeIcon sx={{ color: colour }} />
              </Button>

              {/* */}

            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <AccountCircleIcon sx={{ fontSize: "40px" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/userProfile");
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    sessionCallback();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {showName && (
        <Share
          close={() => {
            setShowName(false);
          }}
          colour={colour}
        />
      )}
    </React.Fragment>
  );
};
export default ResponsiveAppBar;

const Share = ({ close, colour }) => {
  const { phoneNumber } = useWrapper();
  return (
    <div className={PS.glass} style={{ zIndex: "100" }} >
      <div
        className={PS.cBox}
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "space-between",
          background: "white",
          height: "15%",
          width: "20%"
        }}
      >
        <div
          style={{
            // borderBottom: "1px solid black",
            display: "flex",
            height: "15%",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              color: " rgb(41, 91, 228)",
              marginLeft: "10px",
              marginTop: "5px"
            }}
          >
            Share
            <span
              style={{
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
              onClick={close}
            >
              <span
                style={{ height: "18px", color: "red", fontWeight: "600" }}
              >
                {" "}
                Close
              </span>
            </span>
          </div>
        </div>

        <Box sx={{ with: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }} >

          <TwitterShareButton
            url={`http://localhost:3000/project/${phoneNumber}`}
            title={
              "This is my portfolio. go check it out :)."
            }
          >
            <TwitterIcon size={36} round className={PS.icon} />
          </TwitterShareButton>


          <LinkedinShareButton url={`http://localhost:3000/project/${phoneNumber}`}>
            <LinkedinIcon size={36} round className={PS.icon} />
          </LinkedinShareButton>


          <FacebookShareButton
            url={`http://localhost:3000/project/${phoneNumber}`}
            quote={
              "This is my portfolio. go check it out :)."
            }
            hashtag={"#nextshare"}
          >
            <FacebookIcon size={36} round className={PS.icon} />
          </FacebookShareButton>

          <WhatsappShareButton
            url={`http://localhost:3000/project/${phoneNumber}`}
            title={
              "This is my portfolio. go check it out :)."
            }
            separator=":: "
          >
            <WhatsappIcon size={36} round className={PS.icon} />
          </WhatsappShareButton>

        </Box>


      </div>
    </div>
  );
};