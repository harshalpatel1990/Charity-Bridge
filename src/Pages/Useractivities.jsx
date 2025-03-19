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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Useractivities() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{display:"flex",justifyContent:"center",padding:"3%"}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Contributors</TableCell>
              <TableCell align="right">Funds</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <React.Fragment>
                    <Button variant="outlined" onClick={handleClickOpen}>
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
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                          >
                            <CloseIcon />
                          </IconButton>

                          <Button
                            autoFocus
                            color="inherit"
                            onClick={handleClose}
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
                            aria-label="basic tabs example"
                          >
                            <Tab label="Volunteer" {...a11yProps(0)} />
                            <Tab label="Contribute" {...a11yProps(1)} />
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
                                  id="outlined-disabled"
                                  label="Activity Detail"
                                  defaultValue=""
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
                                  id="outlined-basic"
                                  label="message"
                                  variant="outlined"
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
                                <Button variant="outlined">
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
                                  id="outlined-basic"
                                  label="Amount"
                                  variant="outlined"
                                  sx={{ width: "100%" }}
                                />

                                <br />
                                <br />
                                <TextField
                                  disabled
                                  id="outlined-disabled"
                                  label="Activity Detail"
                                  defaultValue=""
                                />
                                <br />
                                <br />
                                <TextField
                                  disabled
                                  id="outlined-disabled"
                                  label="Funds Required"
                                  defaultValue=""
                                />
                                <br />
                                <br />

                                <center>
                                  <Button variant="outlined">Submit</Button>
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
