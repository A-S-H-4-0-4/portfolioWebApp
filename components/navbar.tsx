import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { grey } from '@mui/material/colors';

// router
import { useRouter } from "next/router";



const ResponsiveAppBar = ({callBack,colour,color}) => {

  const router = useRouter();
  // const [color, setColor] = React.useState('white')
  // const [colour, setColour] = React.useState('black')
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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





  const styles = {
    width: '100%',
    backgroundColor: color,
  }
  return (
    <React.Fragment>
      <AppBar position="static" style={styles}>
        <Container maxWidth="xl" >
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 4,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: colour,
                textDecoration: 'none',
              }}
            >
              ASH
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: colour, }}
              >
                <MenuIcon />
              </IconButton>
              <Menu 
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none', },
                }}
                
              >
                <MenuItem onClick={() => { router.push("/home") }}>
                  <Typography textAlign="center" >Home</Typography>
                </MenuItem>
                <MenuItem  >
                  <Typography textAlign="center" >Resume</Typography>
                </MenuItem>
                <MenuItem onClick={() => { router.push("/contact") }} >
                  <Typography textAlign="center" >Contact</Typography>
                </MenuItem>
                <MenuItem onClick={callBack} >
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
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: colour,
                textDecoration: 'none',
              }}
            >
              ASH
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button
                onClick={() => { router.push("/home") }}
                sx={{ my: 2, color: colour, display: 'block' }}
              >
                Home

              </Button>

              <Button
                // onClick={() => { router.push("/home") }}
                sx={{ my: 2, color: colour, display: 'block' }}
              >
                Resume

              </Button>

              <Button
                onClick={() => { router.push("/contact") }}
                sx={{ my: 2, color: colour, display: 'block' }}
              >
                Contact

              </Button>
              <Button
                onClick={callBack}
              // sx={{ my: 2, color: '#121212', display: 'block' }}
              >
                <DarkModeIcon sx={{ color: colour }} />

              </Button>

            </Box>

            {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>

              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>

                <Typography textAlign="center">Add-Projects</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>

                <Typography textAlign="center">LogOut</Typography>
              </MenuItem>
            </Menu>
          </Box> */}


            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem onClick={() => { router.push("/userProfile") }}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => { router.push("") }}>
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
