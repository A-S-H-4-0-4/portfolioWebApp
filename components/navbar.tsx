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

  const { sessionCallback } = useWrapper();

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
                <MenuItem
                  onClick={() => {
                    router.push("/projectScreen");
                  }}
                >
                  <Typography textAlign="center">Create Project</Typography>
                </MenuItem>
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
              <Button
                sx={{ my: 2, color: colour, display: "block" }}
                onClick={() => {}}
              >
                Create Project
              </Button>

             
              <Button
                onClick={callBack}
                // sx={{ my: 2, color: '#121212', display: 'block' }}
              >
                <DarkModeIcon sx={{ color: colour }} />
              </Button>
              <Tooltip
                title="Add TechStack"
                sx={{ color: colour, cursor: "pointer" }}
              >
                <TwitterShareButton
                  url={"https://github.com/next-share"}
                  title={
                    "next-share is a social share buttons for your next React apps."
                  }
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </Tooltip>

              <Tooltip
                title="Add TechStack"
                sx={{ color: colour, cursor: "pointer" }}
              >
                <LinkedinShareButton url={"https://github.com/next-share"}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </Tooltip>
              <Tooltip
                title=""
                sx={{ color: colour, cursor: "pointer" }}
              >
                <FacebookShareButton
                  url={"https://github.com/next-share"}
                  quote={
                    "next-share is a social share buttons for your next React apps."
                  }
                  hashtag={"#nextshare"}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </Tooltip>
              <Tooltip
                title="Add TechStack"
                sx={{ color: colour, cursor: "pointer" }}
              >
                <WhatsappShareButton
                  url={"https://github.com/next-share"}
                  title={
                    "next-share is a social share buttons for your next React apps."
                  }
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </Tooltip>

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
    </React.Fragment>
  );
};
export default ResponsiveAppBar;
