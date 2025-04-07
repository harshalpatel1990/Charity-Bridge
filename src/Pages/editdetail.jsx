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
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Editdetail({ selectedActivity, onUpdate, onclose }) {
  let [data, setdata] = React.useState({
    name: selectedActivity?.activityname || "",
    loc: selectedActivity?.location || "",
    desc: selectedActivity?.description || "",
    funds: selectedActivity?.funds || "",
    cont: selectedActivity?.contributors || "",
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

  

  const handleSubmit = async () => {
    try {
      if (!selectedActivity || !selectedActivity.id) {
        alert("No activity selected for editing.");
        return;
      }

      const activityDocRef = doc(db, "activities", selectedActivity.id);
      await updateDoc(activityDocRef, {
        activityname: data.name,
        contributors: Number(data.cont),
        description: data.desc,
        funds: Number(data.funds),
        location: data.loc,
      });

      Swal.fire({
        title: "Success!",
        text: "your activity has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      onUpdate(); // Refresh the activity list
      onClose(); // Close the edit dialog
    } catch (err) {
      console.error("Error updating activity: ", err);
      alert("Error updating activity. Please try again.");
    }
  };

  return (
    <div
      className="box"
      style={{ display: "flex", justifyContent: "center", padding: "3%" }}
    >
      <center style={{ fontFamily: "cursive" }}>
        <h1 style={{ fontFamily: "cursive", marginBottom: "2%" }}>
          Edit Activity
        </h1>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} key={0} sx={gridStyles}>
            <div className="box1"
            TextField
            label='Activity Name'
            name='activityname'
            value={data.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Contributors'
            name='contributors'
            type='number'
            value={data.cont}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Description'
            name='description'
            value={data.desc}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Funds'
            name='funds'
            type='number'
            value={data.funds}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Location'
            name='location'
            value={data.loc}
            onChange={handleChange}
            fullWidth
          />
          </Grid>
        </Grid>

        <Button
          style={{ marginTop: "2%", backgroundColor: "#5DADE2" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {/* </div> */}
      </center>
    </div>
  );
}

export default Editdetail;
