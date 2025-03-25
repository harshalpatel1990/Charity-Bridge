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
import { db } from "../config/firebase";
import { getDocs, collection, deleteDoc } from "firebase/firestore";
import { useEffect } from "react";

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

  const handleClickOpen = (activityName, funds) => {
    setSelectedActivityName(activityName); // Set the selected activity name
    setSelectedFunds(funds); // Set the selected funds value
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
  useEffect(() => {
    getactivity();
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "3%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Contributors</TableCell>
              <TableCell align='center'>Funds</TableCell>
              <TableCell align='center'>Location</TableCell>
              <TableCell align='center'>Description&nbsp;(g)</TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activity.map((row) => (
              <TableRow
                key={row.activityname}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align='center'>{row.activityname}</TableCell>
                <TableCell align='center' component='th' scope='row'>
                  {row.contributors}
                </TableCell>
                <TableCell align='center'>{row.funds}</TableCell>
                <TableCell align='center'>{row.location}</TableCell>

                <TableCell align='center'>{row.discription}</TableCell>
                <TableCell align='center'>
                  <React.Fragment>
                    <Button
                      variant='outlined'
                      onClick={() =>
                        handleClickOpen(row.activityname, row.funds)
                      } // Pass activityname and funds
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
                        <Toolbar>
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
                          >
                            <Tab label='Volunteer' {...a11yProps(0)} />
                            <Tab label='Contribute' {...a11yProps(1)} />
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
                                <Button variant='outlined'>
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
                                  <Button variant='outlined'>Submit</Button>
                                </center>
                              </Grid>
                            </Grid>
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
