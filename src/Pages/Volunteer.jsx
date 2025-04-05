import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { Button, Grid } from "@mui/material";

function Volunteer() {
  const [activities, setActivities] = useState([]);
  

  return (
    <>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid item xs={12} md={12} lg={12}>
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
        </Grid>
      </Grid>
    </>
  );
}

export default Volunteer;
