import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";


function VerifyUser() {
  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      { userdata.length === 0 ? (
        <Typography variant="h6" sx={{ fontFamily: "cursive" }}>No users found.</Typography>
      ) : (
        userdata.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent sx={{ padding: "20px" }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", color: "primary.main", mb: 2, fontFamily: "cursive" }}
                >
                  Name: {item.name}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1, fontFamily: "cursive" }}>
                  <strong>Username:</strong> {item.username}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, fontFamily: "cursive" }}>
                  <strong>User ID:</strong> {item.userId}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, fontFamily: "cursive" }}>
                  <strong>Age:</strong> {item.age}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, fontFamily: "cursive" }}>
                  <strong>City:</strong> {item.city}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, fontFamily: "cursive" }}>
                  <strong>Contact:</strong> {item.contact}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, fontFamily: "cursive" }}>
                  <strong>Email:</strong> {item.email}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, fontFamily: "cursive" }}>
                  <strong>Gender:</strong> {item.gender}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button size="small" color="primary" sx={{ fontFamily: "cursive" }}>
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
