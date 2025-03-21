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
// import { signOut } from "firebase/auth";


const drawerWidth = 240;

let arr = [
  // {
  //   name: "Register",
  //   path: "/ngo/register",
  // },
  // {
  //   name: "Login",
  //   path: "/ngo/login",
  // },
  {
    name: "Activities",
    path: "/ngo/activities",
  },

  {
    name: "Profile",
    path: "/ngo/profile",
  },
  {
    name: "Contributor Profile",
    path: "/ngo/contributorprofile",
  },
];

let ContributorItems = [
  {
    name: "Activities",
    path: "/user/activities",
  },

  {
    name: "Profile",
    path: "/user/profile",
  },
  {
    name: "Dashboard",
    path: "/user/dasboard",
  },
];
let AdminItems = [
  {
    name: "Verify User",
    path: "/admin/verifyuser",
  },
  {
    name: "Verify NGO",
    path: "/admin/verifyngo",
  },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);
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

  // console.log(window.location);

  const getMenus = () => {
    if (window.location.pathname.includes("ngo")) {
      return arr;
    } else if (window.location.pathname.includes("user")) {
      return ContributorItems;
    } else if (window.location.pathname.includes("ngo")) {
      return AdminItems;
    }
  }

//   const logout = async () => {
//     try{
//       await signOut(auth);
//     }
//     catch (error) {
//       console.log(error);
//   }
// }

  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "black", // Change this to your desired color
        }}
      >
        <Toolbar>
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

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Charity Bridge
          </Typography>
          <Button  color="inherit">Logout</Button>
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
          {getMenus().map((text, index) => (
            <ListItem
              key={text.name}
              disablePadding
              onClick={() => {
                navigate(text.path);
                setOpen(false);
              }}
            >
              <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? 
                  <InboxIcon /> : 
                  <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
