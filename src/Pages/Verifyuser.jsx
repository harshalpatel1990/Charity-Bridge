import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { db } from "../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function VerifyUser() {
  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userinfo"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Verify Button Click
  const handleVerify = async (id) => {
    try {
      const userDocRef = doc(db, "userinfo", id); // Reference to the specific document
      await updateDoc(userDocRef, {
        verifyuser: true, // Update the 'verifyuser' field to true
      });
      alert("User verified successfully!");
      // Optionally, update the local state to reflect the change
      setUserData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, verifyuser: true } : item
        )
      );
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Failed to verify user. Please try again.");
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
      {loading ? (
        <DotLottieReact
          width="300px"
          src="https://lottie.host/b7474075-e871-4bd4-bc13-3cfadd9b52e6/UZLtIAKm9x.lottie"
          loop
          autoplay
        />
      ) : userdata.length === 0 ? (
        <Typography variant="h6" sx={{ fontFamily: "cursive" }}>
          No users found.
        </Typography>
      ) : (
        userdata.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent sx={{ padding: "20px" }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 2,
                    fontFamily: "cursive",
                  }}
                >
                  Name: {item.name} {" "}
                  {item.verifyuser ? <TaskAltIcon/> : null}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "cursive" }}
                >
                  <strong>Username:</strong> {item.username}
                  
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "cursive" }}
                >
                  <strong>User ID:</strong> {item.userId}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "cursive" }}
                >
                  <strong>Age:</strong> {item.age}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "cursive" }}
                >
                  <strong>City:</strong> {item.city}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "cursive" }}
                >
                  <strong>Contact:</strong> {item.contact}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "cursive" }}
                >
                  <strong>Email:</strong> {item.email}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "cursive" }}
                >
                  <strong>Gender:</strong> {item.gender}
                </Typography>
               <Typography>
               
               </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
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

export default VerifyUser;
