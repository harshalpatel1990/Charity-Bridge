import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Grid } from "@mui/material";
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
import Ngoactivitydetail from "./ngoactivitydetail";
import Editdetail from "./editdetail";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import "./Form.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  updateDoc,
  increment,
  collection,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { useEffect } from "react";

//for funds
function createfunds(name, funds) {
  return { name, funds };
}
//for volunteer

function createvol(name, email, mobile) {
  return { name, email, mobile };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function Ngoactivities() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [opendailogdel, setOpendailogdel] = React.useState(false);

  const handleClickOpendailog = (activityId) => {
    setSelectedActivityId(activityId); // Set the selected activity ID
    setOpendailogdel(true); // Open the delete confirmation dialog
  };

  const handleClosedailog = () => {
    setOpendailogdel(false);
  };
  const [opendailogedit, setOpendailogedit] = React.useState(false);

  const handleClickOpendailogedit = (activity) => {
    setSelectedActivity(activity); // Set the selected activity data
    setOpendailogedit(true); // Open the edit dialog
  };

  const handleClosedailogedit = () => {
    setOpendailogedit(false);
  };

  const [opendailogpg, setOpendailogpg] = React.useState(false);

  const [selectedActivityId, setSelectedActivityId] = useState(""); // State to store the selected activity ID
  const [selectedActivity, setSelectedActivity] = useState(null); // State to store the selected activity data

  const handleopenpg = (activityId) => {
    setSelectedActivityId(activityId); // Set the selected activity ID
    setOpendailogpg(true); // Open the dialog
  };

  const handleclosepg = () => {
    setOpendailogpg(false);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    marginLeft: 5,
  };
  const [activity, setactivity] = useState([]);
  const activitylistref = collection(db, "activities");

  const getactivity = async () => {
    try {
      // Read the data and set the activity list
      const data = await getDocs(activitylistref);
      const filterdata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setactivity(filterdata); // Update the state with the latest data
    } catch (err) {
      console.error(err);
    }
  };
  console.log("datafromactivity", activity);
  useEffect(() => {
    getactivity();
  }, []);

  const fordelete = async () => {
    try {
      const activityDocRef = doc(db, "activities", selectedActivityId); // Reference the activity document
      await deleteDoc(activityDocRef); // Delete the activity document
      alert("Activity deleted successfully!");
      setOpendailogdel(false); // Close the dialog
      getactivity(); // Refresh the activities list
    } catch (err) {
      console.error("Error deleting activity: ", err);
      alert("Failed to delete activity. Please try again.");
    }
  };

  const [activities, setActivities] = useState([]);

  const fetchActivitiesWithDetails = async () => {
    try {
      // Fetch all activities
      const activitiesCollectionRef = collection(db, "activities");
      const activitiesSnapshot = await getDocs(activitiesCollectionRef);

      const activitiesWithDetails = await Promise.all(
        activitiesSnapshot.docs.map(async (activityDoc) => {
          const activityData = activityDoc.data();

          // Ensure funds is a number
          const funds = Number(activityData.funds) || 0;

          // Fetch contributions for this activity
          const contributionsCollectionRef = collection(db, "contributions");
          const contributionsQuery = query(
            contributionsCollectionRef,
            where("activityId", "==", activityDoc.id)
          );
          const contributionsSnapshot = await getDocs(contributionsQuery);
          const contributions = contributionsSnapshot.docs.map((doc) =>
            doc.data()
          );

          // Fetch volunteers for this activity
          const volunteersCollectionRef = collection(db, "volunteers");
          const volunteersQuery = query(
            volunteersCollectionRef,
            where("activityId", "==", activityDoc.id)
          );
          const volunteersSnapshot = await getDocs(volunteersQuery);
          const volunteers = volunteersSnapshot.docs.map((doc) => doc.data());

          return {
            ...activityData,
            id: activityDoc.id,
            funds, // Ensure funds is a number
            contributions,
            volunteers,
          };
        })
      );

      setActivities(activitiesWithDetails);
    } catch (error) {
      console.error(
        "Error fetching activities, volunteers, and contributions: ",
        error
      );
    }
  };

  useEffect(() => {
    fetchActivitiesWithDetails();
  }, []);

  const handleContribute = async (amount) => {
    if (amount > selectedFunds) {
      alert("The donation amount cannot exceed the required funds.");
      return;
    }

    try {
      // Reference the specific activity document using its Firestore ID
      const activityDocRef = doc(db, "activities", selectedActivityId);

      // Deduct the donated amount from the "funds" field
      await updateDoc(activityDocRef, {
        funds: increment(-amount), // Deduct the donated amount from the required funds
      });

      // Add the contribution to the "contributions" collection
      const contributionsCollectionRef = collection(db, "contributions");
      await addDoc(contributionsCollectionRef, {
        activityId: selectedActivityId, // Reference to the activity
        userName: "John Doe", // Replace with actual user details
        amount: amount, // The donated amount
        timestamp: new Date(), // The current timestamp
      });

      alert("Thank you for your contribution!");
      setOpen(false); // Close the dialog box
    } catch (error) {
      console.error("Error processing contribution: ", error);
      alert("Failed to process your contribution. Please try again.");
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={5}>
          <Button
            variant='outlined'
            onClick={handleClickOpen}
            sx={{
              marginLeft: "30px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Add Activity
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <h1 style={{ fontFamily: "cursive", marginRight: "40%" }}>
            NGO Activities
          </h1>
        </Grid>
      </Grid>

      <React.Fragment>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                New Activity
              </Typography>

              <Button autoFocus color='inherit' onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Ngoactivitydetail />
        </Dialog>
      </React.Fragment>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}
      >
        <TableContainer component={Paper} sx={{ width: "80%" }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align='right'>Contributors</TableCell>
                <TableCell align='right'>Funds</TableCell>
                <TableCell align='right'>Location</TableCell>
                <TableCell align='right'>Description</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activity.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.activityname}
                  </TableCell>
                  <TableCell align='right'>{row.contributors}</TableCell>
                  <TableCell align='right'>{row.funds}</TableCell>
                  <TableCell align='right'>{row.location}</TableCell>
                  <TableCell align='right'>{row.description}</TableCell>
                  <TableCell align='right'>
                    <React.Fragment>
                      <Button
                        onClick={() => {
                          handleopenpg(row.id); // Pass the activity ID
                        }}
                      >
                        <Tooltip title='Activity Progress'>
                          <DonutLargeIcon sx={{ color: "black" }} />
                        </Tooltip>
                      </Button>
                      <Dialog
                        fullScreen
                        open={opendailogpg}
                        onClose={handleclosepg}
                        TransitionComponent={Transition}
                      >
                        <AppBar sx={{ position: "relative" }}>
                          <Toolbar>
                            <IconButton
                              edge='start'
                              color='inherit'
                              onClick={handleclosepg}
                              aria-label='close'
                            >
                              <CloseIcon />
                            </IconButton>
                            <Typography
                              sx={{ ml: 2, flex: 1 }}
                              variant='h6'
                              component='div'
                            >
                              Activity Progress
                            </Typography>
                            <Button
                              autoFocus
                              color='inherit'
                              onClick={handleclosepg}
                            >
                              save
                            </Button>
                          </Toolbar>
                        </AppBar>

                        <Box sx={{ width: "100%", typography: "body1" }}>
                          <TabContext value={value}>
                            <Box
                              sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                              <TabList
                                onChange={handleChange}
                                aria-label='lab API tabs example'
                              >
                                <Tab label='Volunteers' value='1' />
                                <Tab label='Funds' value='2' />
                              </TabList>
                            </Box>
                            <TabPanel value='1'>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  marginTop: "2%",
                                }}
                              >
                                <Paper
                                  sx={{
                                    boxShadow: "10px 10px 20px",
                                    borderRadius: 10,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "50%",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <ul>
                                    {activities
                                      .filter(
                                        (activity) =>
                                          activity.id === selectedActivityId
                                      ) // Filter by selected activity ID
                                      .flatMap(
                                        (activity) => activity.volunteers
                                      ) // Get volunteers for the activity
                                      .map((volunteer, index) => (
                                        <li key={index}>
                                          <strong>Name:</strong>{" "}
                                          {volunteer.userName} <br />
                                          <strong>Email:</strong>{" "}
                                          {volunteer.userEmail} <br />
                                          <strong>Message:</strong>{" "}
                                          {volunteer.message} <br />
                                        </li>
                                      ))}
                                  </ul>
                                </Paper>
                              </div>
                            </TabPanel>
                            <TabPanel value='2'>
                              <TableContainer
                                component={Paper}
                                sx={{ width: "50%" }}
                              >
                                <Table aria-label='simple table'>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Contributor</TableCell>
                                      <TableCell>Amount</TableCell>
                                      <TableCell>Date</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {activities
                                      .filter(
                                        (activity) =>
                                          activity.id === selectedActivityId
                                      ) // Filter by selected activity ID
                                      .flatMap(
                                        (activity) => activity.contributions
                                      ) // Get contributions for the activity
                                      .map((contribution, index) => (
                                        <TableRow key={index + 1}>
                                          <TableCell>
                                            {contribution.userName}
                                          </TableCell>
                                          <TableCell>
                                            {contribution.amount}
                                          </TableCell>
                                          <TableCell>
                                            {new Date(
                                              contribution.timestamp.toDate()
                                            ).toLocaleString()}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </TabPanel>
                          </TabContext>
                        </Box>
                      </Dialog>
                    </React.Fragment>

                    <Button
                      name='edit'
                      onClick={() => {
                        handleClickOpendailogedit(row); // Pass the activity data
                      }}
                    >
                      <Tooltip title='Edit'>
                        <ModeEditIcon sx={{ color: "black" }} />
                      </Tooltip>
                    </Button>
                    <React.Fragment>
                      <Dialog
                        fullScreen
                        open={opendailogedit}
                        onClose={handleClosedailogedit}
                        TransitionComponent={Transition}
                      >
                        <AppBar sx={{ position: "relative" }}>
                          <Toolbar>
                            <IconButton
                              edge='start'
                              color='inherit'
                              onClick={handleClosedailogedit}
                              aria-label='close'
                            >
                              <CloseIcon />
                            </IconButton>
                            <Typography
                              sx={{ ml: 2, flex: 1 }}
                              variant='h6'
                              component='div'
                            >
                              Edit Activity
                            </Typography>
                          </Toolbar>
                        </AppBar>
                        <Editdetail
                          selectedActivity={selectedActivity}
                          onClose={handleClosedailogedit}
                          onUpdate={getactivity} // Refresh the activity list after editing
                        />
                      </Dialog>
                    </React.Fragment>
                    <Button
                      onClick={() => {
                        handleClickOpendailog(row.id); // Pass the activity ID
                      }}
                    >
                      <Tooltip title='Delete'>
                        <DeleteIcon sx={{ color: "black" }} />
                      </Tooltip>
                    </Button>

                    <React.Fragment>
                      <Dialog
                        open={opendailogdel}
                        onClose={handleClosedailog}
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                        BackdropProps={{
                          style: {
                            backgroundColor: "transparent",
                            backdropFilter: "blur(1px)",
                          },
                        }}
                      >
                        <DialogTitle id='alert-dialog-title'>
                          {"Confirm Delete?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id='alert-dialog-description'>
                            Are you sure you want to delete this activity? This
                            action cannot be undone.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClosedailog}>Cancel</Button>
                          <Button onClick={fordelete} autoFocus>
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Ngoactivities;
