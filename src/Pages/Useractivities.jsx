import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { db, auth } from "../config/firebase";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import {
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore"; // Import Firebase functions
import { useEffect } from "react";
import Swal from "sweetalert2";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function Useractivities() {
  const [open, setOpen] = React.useState(false);
  const [selectedActivityName, setSelectedActivityName] = React.useState(""); // Existing state
  const [selectedFunds, setSelectedFunds] = React.useState(""); // New state for funds
  const [donationAmount, setDonationAmount] = React.useState(""); // New state for donation amount
  const [selectedActivityId, setSelectedActivityId] = React.useState(""); // New state for Firestore document ID
  const [ngoDetails, setNgoDetails] = useState(null); // State to store NGO details

  const fetchNgoDetails = async (ngoId) => {
    try {
      const ngoDocRef = doc(db, "ngoinfo", ngoId); // Use "ngoinfo" as the collection name
      const ngoSnapshot = await getDoc(ngoDocRef);

      if (ngoSnapshot.exists()) {
        setNgoDetails(ngoSnapshot.data()); // Store NGO details in state
      } else {
        console.error("NGO not found");
        setNgoDetails(null);
      }
    } catch (error) {
      console.error("Error fetching NGO details:", error);
      setNgoDetails(null);
    }
  };

  const handleClickOpen = (activityId, activityName, funds, ngoId) => {
    setSelectedActivityName(activityName); // Set the activity name for display
    setSelectedActivityId(activityId); // Set the Firestore document ID
    setSelectedFunds(funds); // Set the selected funds value
    fetchNgoDetails(ngoId); // Fetch NGO details using ngoId
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [activity, setactivity] = useState([]);
  const activitylistref = collection(db, "activities");

  const getactivity = async () => {
    try {
      //read the data
      //set the activity list
      const data = await getDocs(activitylistref);
      const filterdata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filterdata);
      setactivity(filterdata);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("datafromactivity", activity);

  getactivity();

  const handleVolunteerParticipation = async () => {
    try {
      const userEmail = auth?.currentUser?.email; // Replace with the logged-in user's email
      const userQuery = query(
        collection(db, "userinfo"),
        where("email", "==", userEmail)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        alert("User information not found.");
        return;
      }

      // Extract the user's name from the query result
      const userDoc = userSnapshot.docs[0];
      const volunteerDetails = {
        activityId: selectedActivityId, // Reference to the activity
        userName: userDoc.data().name, // Replace with actual user details (e.g., from a form or auth)
        userEmail: auth?.currentUser?.email, // Replace with actual user details
        message: "I want to volunteer!", // Example message (can be taken from a TextField)
        timestamp: new Date(), // Add a timestamp
      };

      // Reference the specific activity document
      // const activityDocRef = doc(db, "activities", selectedActivityName);

      // Add the volunteer details to the "volunteers" subcollection
      const volunteersCollectionRef = collection(db, "volunteers");
      await addDoc(volunteersCollectionRef, volunteerDetails);

      Swal.fire({
        title: "You have participated successfully!",
        text: "your details have been submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpen(false); // Close the dialog box
    } catch (error) {
      console.error("Error adding volunteer details: ", error);
      alert("Failed to submit your participation. Please try again.");
    }
  };

  const handleContribute = async (amount) => {
    if (amount > selectedFunds) {
      alert("The donation amount cannot exceed the required funds.");
      return;
    }

    try {
      const usermail = auth?.currentUser?.email; // Get the logged-in user's email
      const userQuery = query(
        collection(db, "userinfo"),
        where("email", "==", usermail)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        alert("User information not found.");
        return;
      }

      // Extract the user's name from the query result
      const userDoc = userSnapshot.docs[0];
      const userEmail = userDoc.data().email;

      // Reference the specific activity document using its Firestore ID
      const activityDocRef = doc(db, "activities", selectedActivityId);

      // Fetch the current activity document to check the funds field
      const activitySnapshot = await getDoc(activityDocRef);
      if (!activitySnapshot.exists()) {
        alert("Activity not found.");
        return;
      }

      const activityData = activitySnapshot.data();
      const currentFunds = activityData.funds || 0; // Default to 0 if funds is not set

      // Ensure funds is a valid number before updating
      if (typeof currentFunds !== "number") {
        await updateDoc(activityDocRef, { funds: 0 });
      }

      // Deduct the donated amount from the "funds" field
      await updateDoc(activityDocRef, {
        funds: increment(-amount), // Deduct the donated amount from the required funds
      });

      // Add the contribution to the "contributions" collection
      const contributionsCollectionRef = collection(db, "contributions");
      await addDoc(contributionsCollectionRef, {
        activityId: selectedActivityId, // Reference to the activity
        userEmail: userEmail, // Use the fetched user name
        amount: amount, // The donated amount
        timestamp: new Date(), // The current timestamp
      });

      Swal.fire({
        title: "Contributed!",
        text: "Your have contributed sucessfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpen(false); // Close the dialog box
    } catch (error) {
      console.error("Error processing contribution: ", error);
      alert("Failed to process your contribution. Please try again.");
    }
  };

  const onsubmit = async () => {
    try {
      await addDoc(activitylistref, {
        activityname: data.name,
        contributors: data.cont,
        description: data.desc,
        funds: Number(data.funds) || 0, // Ensure funds is initialized as a number
        location: data.loc,
      });
      alert("Activity added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add activity. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3%",
        marginTop: "5%",
      }}
    >
      <center>
        <h1 style={{ fontFamily: "cursive" }}>User Activities</h1>
      </center>
      <br />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead
            sx={{
              backgroundColor: "#1a237e",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white" }} align='center'>
                Name
              </TableCell>
              <TableCell sx={{ color: "white" }} align='center'>
                Contributors
              </TableCell>
              <TableCell sx={{ color: "white" }} align='center'>
                Funds
              </TableCell>
              <TableCell sx={{ color: "white" }} align='center'>
                Location
              </TableCell>
              <TableCell sx={{ color: "white" }} align='center'>
                Description
              </TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activity.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align='center'>{row.activityname}</TableCell>
                <TableCell align='center' component='th' scope='row'>
                  {row.contributors}
                </TableCell>
                <TableCell align='center'>{row.funds}</TableCell>
                <TableCell align='center'>{row.location}</TableCell>

                <TableCell align='center'>{row.description}</TableCell>
                <TableCell align='center'>
                  <React.Fragment>
                    <Button
                      sx={{ backgroundColor: "#1a237e", color: "white" }}
                      variant='outlined'
                      onClick={() =>
                        handleClickOpen(
                          row.id,
                          row.activityname,
                          row.funds,
                          row.ngoid
                        )
                      } // Pass ngoid
                    >
                      Participate
                    </Button>
                    <Dialog
                      fullScreen
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Transition}
                    >
                      <AppBar sx={{ position: "relative" }}>
                        <Toolbar sx={{ backgroundColor: "#1a237e" }}>
                          <IconButton
                            edge='start'
                            color='inherit'
                            onClick={handleClose}
                            aria-label='close'
                          >
                            <CloseIcon />
                          </IconButton>

                          <Button
                            autoFocus
                            color='inherit'
                            onClick={handleClose}
                            sx={{ marginLeft: "auto" }} // Align the button to the right
                          >
                            save
                          </Button>
                        </Toolbar>
                      </AppBar>
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label='basic tabs example'
                            sx={{
                              "& .MuiTab-root": {
                                color: "#1a337e", // Default text color for tabs
                              },
                              "& .Mui-selected": {
                                color: "#1A237E", // Text color for the selected tab
                                fontWeight: "bold", // Optional: Make the selected tab bold
                              },
                            }}
                          >
                            <Tab label='Volunteer' {...a11yProps(0)} />
                            <Tab label='Contribute' {...a11yProps(1)} />
                            <Tab label='Ngo Details' {...a11yProps(2)} />
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                          <center>
                            <Grid Container sx={{ width: "50%" }}>
                              <Grid
                                xs={12}
                                md={6}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <TextField
                                  disabled
                                  id='outlined-disabled'
                                  label='Activity Name'
                                  defaultValue={selectedActivityName} // Use selected activity name
                                />
                              </Grid>
                              <br />
                              <br />

                              <Grid
                                xs={12}
                                md={6}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <TextField
                                  id='outlined-basic'
                                  label='message'
                                  variant='outlined'
                                />
                              </Grid>
                              <br />
                              <br />
                              <Grid
                                xs={12}
                                md={6}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  variant='outlined'
                                  onClick={handleVolunteerParticipation}
                                  sx={{
                                    backgroundColor: "#1a237e",
                                    color: "white",
                                  }}
                                >
                                  Participate as volunteer
                                </Button>
                              </Grid>
                            </Grid>
                          </center>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                          <center>
                            <Grid Container sx={{ width: "50%" }}>
                              <Grid>
                                <TextField
                                  id='outlined-basic'
                                  label='Amount'
                                  variant='outlined'
                                  sx={{ width: "100%" }}
                                  onChange={(e) =>
                                    setDonationAmount(e.target.value)
                                  } // Capture the donation amount
                                />

                                <br />
                                <br />
                                <TextField
                                  disabled
                                  id='outlined-disabled'
                                  label='Activity Detail'
                                  defaultValue={selectedActivityName}
                                />
                                <br />
                                <br />
                                <TextField
                                  disabled
                                  id='outlined-disabled'
                                  label='Funds Required'
                                  defaultValue={selectedFunds} // Use selected funds value
                                />
                                <br />
                                <br />

                                <center>
                                  <Button
                                    variant='outlined'
                                    sx={{
                                      backgroundColor: "#1a237e",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      handleContribute(Number(donationAmount))
                                    } // Pass the donation amount
                                  >
                                    Submit
                                  </Button>
                                </center>
                              </Grid>
                            </Grid>
                          </center>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                          <center>
                            <Paper
                              elevation={5}
                              sx={{
                                padding: 4,
                                width: "35%",
                                borderRadius: 3,
                                background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
                                border: "1px solid rgba(26, 35, 126, 0.1)",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                  transform: "translateY(-5px)",
                                  boxShadow: "0 12px 30px rgba(26, 35, 126, 0.15)",
                                },
                              }}
                            >
                              {ngoDetails ? (
                                <Box>
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      fontFamily: "'Playfair Display', serif",
                                      color: "#1a237e",
                                      fontWeight: 600,
                                      marginBottom: 3,
                                      textAlign: "center",
                                      position: "relative",
                                      "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: -8,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: "60px",
                                        height: "3px",
                                        background: "linear-gradient(90deg, #1a237e, #3949ab)",
                                        borderRadius: "2px",
                                      },
                                    }}
                                  >
                                    NGO Details
                                  </Typography>

                                  <Box sx={{ mt: 4 }}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        mb: 3,
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Typography
                                        variant="h5"
                                        sx={{
                                          fontFamily: "'Playfair Display', serif",
                                          color: "#1a237e",
                                        }}
                                      >
                                        {ngoDetails.ngoname || "N/A"}
                                      </Typography>
                                      {ngoDetails.verifyngo && (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            bgcolor: "rgba(26, 35, 126, 0.1)",
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 2,
                                            gap: 0.5,
                                          }}
                                        >
                                          <DoneAllIcon sx={{ color: "#1a237e", fontSize: "1rem" }} />
                                          <Typography
                                            sx={{
                                              color: "#1a237e",
                                              fontSize: "0.875rem",
                                              fontWeight: 500,
                                            }}
                                          >
                                            Verified
                                          </Typography>
                                        </Box>
                                      )}
                                    </Box>

                                    {[
                                      { label: "Email", value: ngoDetails.email },
                                      { label: "Contact", value: ngoDetails.contact },
                                      { label: "Address", value: ngoDetails.city },
                                    ].map((item, index) => (
                                      <Box
                                        key={index}
                                        sx={{
                                          mb: 2.5,
                                          p: 2,
                                          borderRadius: 2,
                                          backgroundColor: "rgba(26, 35, 126, 0.02)",
                                          transition: "all 0.2s ease",
                                          "&:hover": {
                                            backgroundColor: "rgba(26, 35, 126, 0.05)",
                                            transform: "translateX(5px)",
                                          },
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          sx={{
                                            color: "#1a237e",
                                            fontWeight: 600,
                                            mb: 0.5,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                          }}
                                        >
                                          <span className="material-icons">{item.icon}</span>
                                          {item.label}
                                        </Typography>
                                        <Typography
                                          variant="body1"
                                          sx={{
                                            color: "#424242",
                                            pl: 4,
                                          }}
                                        >
                                          {item.value || "N/A"}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    py: 4,
                                    textAlign: "center",
                                  }}
                                >
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      color: "#9e9e9e",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    No NGO details available
                                  </Typography>
                                </Box>
                              )}
                            </Paper>
                          </center>
                        </CustomTabPanel>
                      </Box>
                    </Dialog>
                  </React.Fragment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Useractivities;
