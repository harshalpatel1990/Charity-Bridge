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

function Editdetail({ selectedActivity, onUpdate, onClose }) {
  let [data, setdata] = React.useState({
    activityname: selectedActivity?.activityname || "",
    location: selectedActivity?.location || "",
    description: selectedActivity?.description || "",
    funds: selectedActivity?.funds || "",
    contributors: selectedActivity?.contributors || "",
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

  const handleSave = async () => {
    try {
      if (!selectedActivity || !selectedActivity.id) {
        alert("No activity selected for editing.");
        return;
      }

      const activityDocRef = doc(db, "activities", selectedActivity.id);
      await updateDoc(activityDocRef, {
        activityname: data.activityname,
        contributors: Number(data.contributors),
        description: data.description,
        funds: Number(data.funds),
        location: data.location,
      });

      Swal.fire({
        title: "Success!",
        text: "your activity has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      if (onUpdate) {
        await onUpdate();
      }
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Error updating activity: ", err);
      alert("Error updating activity. Please try again.");
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Activity</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label='Activity Name'
            name='activityname'
            value={data.activityname}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Contributors'
            name='contributors'
            type='number'
            value={data.contributors}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Description'
            name='description'
            value={data.description}
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
            value={data.location}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={handleSave}>
            Save Changes
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Editdetail;
