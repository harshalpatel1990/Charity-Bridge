import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { db } from "../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import TaskAltIcon from '@mui/icons-material/TaskAlt'; // Import TaskAltIcon

function Verifyngo() {
  const [registerdata, setRegisterData] = useState([]); // State to store fetched data

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ngoinfo"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRegisterData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle Verify Button Click
  const handleVerify = async (id) => {
    try {
      const ngoDocRef = doc(db, "ngoinfo", id); // Reference to the specific document
      await updateDoc(ngoDocRef, {
        verifyngo: true, // Update the 'verifyngo' field to true
      });
      alert("NGO verified successfully!");
      // Optionally, update the local state to reflect the change
      setRegisterData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, verifyngo: true } : item
        )
      );
    } catch (error) {
      console.error("Error verifying NGO:", error);
      alert("Failed to verify NGO. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {registerdata.length === 0 ? (
        <Typography variant="h6">Loading data...</Typography>
      ) : (
        registerdata.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent sx={{ padding: "20px" }}>
                {/* NGO Name */}
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    fontFamily: "cursive",
                    mb: 2,
                  }}
                >
                  NGO Name: {item.ngoname} {" "}
                  {item.verifyngo ? <TaskAltIcon/> : null}

                </Typography>

                {/* User Details */}
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "cursive", mb: 1 }}
                >
                  <strong>User Name:</strong> {item.username}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "cursive", mb: 1 }}
                >
                  <strong>User ID:</strong> {item.userId}
                </Typography>

                {/* Location & Contact */}
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "cursive", mb: 1 }}
                >
                  <strong>City:</strong> {item.city}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "cursive", mb: 1 }}
                >
                  <strong>Contact:</strong> {item.contact}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "cursive", mb: 1 }}
                >
                  <strong>Email:</strong> {item.email}
                </Typography>

                {/* Additional Information */}
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "cursive", color: "text.secondary", mt: 2 }}
                >
                  <strong>Year of Establishment:</strong>{" "}
                  {item.yearofestablishment}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "cursive",
              }}
            >
              <Button
                size="small"
                color="primary"
                sx={{ fontFamily: "cursive" }}
                onClick={() => handleVerify(item.id)} // Pass the document ID
              >
                Verify
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  );
}

export default Verifyngo;
