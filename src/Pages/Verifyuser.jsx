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
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Grid, Container, Box } from "@mui/material";

const styles = {
  verifiedIcon: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
      color: "#1a237e",
      background: "rgba(26, 35, 126, 0.1)",
      borderRadius: "50%",
      padding: "4px",
      transition: "all 0.3s ease",
      animation: "pulse 2s infinite",
      "@keyframes pulse": {
        "0%": {
          transform: "scale(1)",
          boxShadow: "0 0 0 0 rgba(26, 35, 126, 0.4)",
        },
        "70%": {
          transform: "scale(1.1)",
          boxShadow: "0 0 0 10px rgba(26, 35, 126, 0)",
        },
        "100%": {
          transform: "scale(1)",
          boxShadow: "0 0 0 0 rgba(26, 35, 126, 0)",
        },
      },
    },
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    border: "1px solid rgba(26, 35, 126, 0.1)",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 16px rgba(26, 35, 126, 0.2)",
    },
  },
  cardContent: {
    padding: "20px",
    backgroundColor: "rgba(26, 35, 126, 0.02)",
  },
  title: {
    fontWeight: "bold",
    color: "#1a237e",
    fontFamily: "'Playfair Display', serif",
    mb: 2,
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  text: {
    fontFamily: "'Playfair Display', serif",
    mb: 1,
    color: "#1a237e",
    "& strong": {
      color: "#1a237e",
    },
  },
  verifyButton: {
    bgcolor: "#1a237e",
    color: "white",
    px: 4,
    py: 1,
    borderRadius: "25px",
    fontSize: "1rem",
    fontFamily: "'Playfair Display', serif",
    textTransform: "none",
    boxShadow: "0 4px 12px rgba(26, 35, 126, 0.2)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)",
      transform: "translateX(-100%)",
    },
    "&:hover": {
      bgcolor: "#283593",
      transform: "translateY(-3px)",
      boxShadow: "0 8px 20px rgba(26, 35, 126, 0.4)",
      "&::before": {
        transform: "translateX(100%)",
        transition: "transform 0.75s ease-in-out",
      },
    },
    "&:active": {
      transform: "translateY(-1px)",
      boxShadow: "0 5px 15px rgba(26, 35, 126, 0.3)",
    },
    "&:disabled": {
      bgcolor: "#4caf50",
      color: "white",
      animation: "pulse 2s infinite",
      "&:hover": {
        transform: "none",
        boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
      },
    },
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
        boxShadow: "0 0 0 0 rgba(76, 175, 80, 0.4)",
      },
      "70%": {
        transform: "scale(1.05)",
        boxShadow: "0 0 0 10px rgba(76, 175, 80, 0)",
      },
      "100%": {
        transform: "scale(1)",
        boxShadow: "0 0 0 0 rgba(76, 175, 80, 0)",
      },
    },
  },
};

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
    <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <DotLottieReact
            width="300px"
            src="https://lottie.host/b7474075-e871-4bd4-bc13-3cfadd9b52e6/UZLtIAKm9x.lottie"
            loop
            autoplay
          />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {userdata.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card sx={styles.card}>
                <CardActionArea>
                  <CardContent sx={styles.cardContent}>
                    <Typography variant="h5" component="div" sx={styles.title}>
                      {item.name}{" "}
                      {item.verifyuser && (
                        <Box sx={styles.verifiedIcon}>
                          <TaskAltIcon />
                        </Box>
                      )}
                    </Typography>

                    <Typography variant="body1" sx={styles.text}>
                      <strong>Username:</strong> {item.username}
                    </Typography>
                    <Typography variant="body1" sx={styles.text}>
                      <strong>User ID:</strong> {item.userId}
                    </Typography>
                    <Typography variant="body1" sx={styles.text}>
                      <strong>Age:</strong> {item.age}
                    </Typography>
                    <Typography variant="body1" sx={styles.text}>
                      <strong>City:</strong> {item.city}
                    </Typography>
                    <Typography variant="body1" sx={styles.text}>
                      <strong>Contact:</strong> {item.contact}
                    </Typography>
                    <Typography variant="body1" sx={styles.text}>
                      <strong>Email:</strong> {item.email}
                    </Typography>
                    <Typography variant="body1" sx={styles.text}>
                      <strong>Gender:</strong> {item.gender}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{ display: "flex", justifyContent: "center", p: 2 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleVerify(item.id)}
                    disabled={item.verifyuser}
                    sx={(theme) => ({
                      ...styles.verifyButton,
                      ...(item.verifyuser && {
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, #1a237e)`,
                      }),
                    })}
                  >
                    {item.verifyuser ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        Verified
                        <TaskAltIcon sx={{ fontSize: "1.2rem" }} />
                      </Box>
                    ) : (
                      "Verify User"
                    )}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default VerifyUser;
