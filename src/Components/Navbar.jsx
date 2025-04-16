import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PersonIcon from "@mui/icons-material/Person"; // Add this import
import DashboardIcon from "@mui/icons-material/Dashboard";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BusinessIcon from "@mui/icons-material/Business";
import { useState } from "react";
import { useEffect } from "react";

const drawerWidth = 240;

let arr = [
  {
    name: "Activities",
    path: "/ngo/activities",
    icon: <VolunteerActivismIcon />,
  },
  {
    name: "Profile",
    path: "/ngo/profile",
    icon: <PersonIcon />, // Changed from AccountCircleIcon
  },
];

let ContributorItems = [
  {
    name: "Activities",
    path: "/user/activities",
    icon: <VolunteerActivismIcon />,
  },
  {
    name: "Profile",
    path: "/user/profile",
    icon: <PersonIcon />, // Changed from AccountCircleIcon
  },
  {
    name: "history",
    path: "/user/history",
    icon: <DashboardIcon />,
  },
];
let AdminItems = [
  {
    name: "Verify User",
    path: "/admin/verifyuser",
    icon: <VerifiedUserIcon />,
  },
  {
    name: "Verify NGO",
    path: "/admin/verifyngo",
    icon: <BusinessIcon />,
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
export default function NavBar() {
  const theme = useTheme();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getMenus = () => {
    if (window.location.pathname.includes("admin")) {
      return AdminItems;
    } else if (window.location.pathname.includes("user")) {
      return ContributorItems;
    } else if (window.location.pathname.includes("ngo")) {
      return arr;
    } else {
      return [];
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("ngoid");
      localStorage.removeItem("email");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#1a237e", // Change this to your desired color
        }}
      >
        <Toolbar>
          {localStorage.getItem("accessToken") ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              onClose={handleDrawerClose}
              sx={[
                {
                  mr: 2,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ flexGrow: 1, fontFamily: "cursive" }}
          >
            Charity Bridge
          </Typography>{" "}
          {localStorage.getItem("accessToken") ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : null}
          <Button
            onClick={() => {
              navigate("/contactus");
            }}
            style={{ color: "white", fontFamily: "cursive" }}
          >
            Contact Us
          </Button>
          <Button
            onClick={() => {
              navigate("/aboutus");
            }}
            style={{ color: "white", fontFamily: "cursive" }}
          >
            About Us
          </Button>
          <Button
            onClick={() => {
              navigate("/ourservices");
            }}
            style={{ color: "white", fontFamily: "cursive" }}
          >
            Our Services
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {getMenus().map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    backgroundColor: "rgba(26, 35, 126, 0.1)", // Light navy blue background
                    borderRadius: "50%", // Makes it circular
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1a237e", // Navy blue color for icons
                    marginRight: 1,
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.5rem", // Adjust icon size
                    },
                    "&:hover": {
                      backgroundColor: "rgba(26, 35, 126, 0.2)", // Darker on hover
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    "& .MuiTypography-root": {
                      color: "#1a237e",
                      fontFamily: "'Dancing Script', cursive",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
