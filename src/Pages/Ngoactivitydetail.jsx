import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./Form.css";
import { db } from "../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
function Ngoactivitydetail() {
  let [data, setdata] = React.useState({
    name: "",
    number: "",
    loc: "",
    desc: "",
    funds: "",
    cont: "",
    cont_role: "",
  });

  let gridStyles = {
    padding: "7px",
  };

  const handleChange = (event) => {
    setdata({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const activitylistref = collection(db, "activities");
  
  const onsubmit = async () => {
    try {
      await addDoc(activitylistref, {
        activityname: data.name,
        contributors: data.cont,
        discription: data.desc,
        funds: data.funds,
        location: data.loc,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className="box"
      style={{ display: "flex", justifyContent: "center", padding: "3%" }}
    >
      <center style={{ fontFamily: "cursive" }}>
        <h1 style={{ fontFamily: "cursive", marginBottom: "2%" }}>
          NGO Activity
        </h1>

        <Grid container>
          <Grid item xs={12} sm={12} md={4} key={0} sx={gridStyles}>
            <div className="box1">
              <TextField
                id="filled-text"
                label="Activity Name"
                type="text"
                variant="outlined"
                name="name"
                onChange={handleChange}
                fullWidth
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} key={1} sx={gridStyles}>
            <LocalizationProvider dateAdapter={AdapterDayjs} className="date">
              <DatePicker label="Start Date" style={{ width: "100%" }} />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={4} key={2} sx={gridStyles}>
            {/* <div className="box2"> */}
            <TextField
              id="filled-text"
              label="Contact No."
              type="Number"
              variant="outlined"
              name="number"
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} key={3} sx={gridStyles}>
            <TextField
              id="outlined-multiline-static"
              label="Location"
              multiline
              placeholder="address"
              name="loc"
              onChange={handleChange}
              fullWidth
            />
            {/* </div> */}
          </Grid>

          <Grid item xs={12} sm={12} md={4} key={5} sx={gridStyles}>
            {/* <div className="box2"> */}
            <TextField
              id="filled-text"
              label="Funds Required"
              type="Number"
              name="funds"
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} key={6} sx={gridStyles}>
            <TextField
              id="filled-text"
              label="Contributors Required"
              type="Number"
              name="cont"
              onChange={handleChange}
              fullWidth
            />
            {/* </div> */}
          </Grid>

          <Grid item xs={12} sm={12} md={4} key={7} sx={gridStyles}>
            <TextField
              id="outlined-multiline-static"
              label="Contributers Role"
              multiline
              rows={4}
              placeholder="Contrintributors Role"
              name="cont_role"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key={4} sx={gridStyles}>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              placeholder="Description"
              name="desc"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          style={{ marginTop: "2%" }}
          variant="contained"
          onClick={onsubmit}
        >
          Submit
        </Button>
        {/* </div> */}
      </center>
    </div>
  );
}

export default Ngoactivitydetail;
