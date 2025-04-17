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
import { db, auth } from "../config/firebase";
import { getDocs, collection, addDoc, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';

function Ngoactivitydetail({ onClose, getactivity }) {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = React.useState({
    name: "",
    number: "",
    loc: "",
    desc: "",
    funds: "",
    cont: "",
    cont_role: "",
  });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const onsubmit = async () => {
    try {
      const ngoinfoCollectionRef = collection(db, "ngoinfo");

      // Query to find the logged-in NGO's document using their email
      const ngoQuery = query(
        ngoinfoCollectionRef,
        where("email", "==", auth?.currentUser?.email)
      );
      const ngoSnapshot = await getDocs(ngoQuery);

      if (ngoSnapshot.empty) {
        enqueueSnackbar("NGO information not found.", { 
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        return;
      }

      // Get the first document (assuming email is unique)
      const ngoDoc = ngoSnapshot.docs[0];
      const ngoId = ngoDoc.id;
      const activitylistref = collection(db, "activities");
      await addDoc(activitylistref, {
        activityname: data.name,
        contributors: data.cont,
        description: data.desc,
        funds: data.funds,
        location: data.loc,
        ngoid: ngoId,
      });

      enqueueSnackbar('Activity added successfully!', { 
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      onClose(); // Close the dialog box after submission

      getactivity();
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to add activity. Please try again.', { 
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  return (
    <div
      className="box"
      style={{ display: "flex", justifyContent: "center", padding: "3%" }}
    >
      <SnackbarProvider maxSnack={3}>
      <center style={{ fontFamily: "cursive" }}>
        <h1 style={{ fontFamily: "cursive", marginBottom: "2%" }}>
          NGO Activity
        </h1>

        <Grid container>
          <Grid item xs={12} sm={12} md={4} key={0} sx={{ padding: "7px" }}>
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
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            key={1}
            sx={{ padding: "7px" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} className="date">
              <DatePicker label="Start Date" style={{ width: "100%" }} />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={4} key={2} sx={{ padding: "7px" }}>
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

          <Grid item xs={12} sm={12} md={4} key={3} sx={{ padding: "7px" }}>
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

          <Grid item xs={12} sm={12} md={4} key={5} sx={{ padding: "7px" }}>
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

          <Grid item xs={12} sm={12} md={4} key={6} sx={{ padding: "7px" }}>
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

          <Grid item xs={12} sm={12} md={4} key={7} sx={{ padding: "7px" }}>
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
          <Grid item xs={12} sm={12} md={4} key={4} sx={{ padding: "7px" }}>
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
          style={{ marginTop: "2%", backgroundColor: "#1a237e" }}
          variant="contained"
          onClick={onsubmit}
        >
          Submit
        </Button>
        {/* </div> */}
      </center>
      </SnackbarProvider>
    </div>
  );
}

export default Ngoactivitydetail;
