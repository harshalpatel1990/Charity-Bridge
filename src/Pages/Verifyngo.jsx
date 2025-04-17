import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { db } from "../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import TaskAltIcon from "@mui/icons-material/TaskAlt"; // Import TaskAltIcon
import { Grid, Container, Box } from "@mui/material"; // Add this import

// Add this styles object at the top of your file
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
    <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
      {registerdata.length === 0 ? (
        <Typography variant="h6" align="center">
          Loading data...
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {registerdata.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardActionArea>
                  <CardContent sx={{ padding: "20px" }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        color: "#1a237e",
                        fontFamily: "'Playfair Display', serif",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {item.ngoname}{" "}
                      {item.verifyngo && (
                        <Box sx={styles.verifiedIcon}>
                          <TaskAltIcon />
                        </Box>
                      )}
                    </Typography>

                    {/* User Details */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        mb: 1,
                      }}
                    >
                      <strong>Username:</strong> {item.username}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        mb: 1,
                      }}
                    >
                      <strong>User ID:</strong> {item.userId}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        mb: 1,
                      }}
                    >
                      <strong>City:</strong> {item.city}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        mb: 1,
                      }}
                    >
                      <strong>Contact:</strong> {item.contact}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        mb: 1,
                      }}
                    >
                      <strong>Email:</strong> {item.email}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        color: "text.secondary",
                        mt: 2,
                      }}
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
                    padding: 2,
                    mt: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleVerify(item.id)}
                    disabled={item.verifyngo}
                    sx={(theme) => ({
                      ...styles.verifyButton,
                      ...(item.verifyngo && {
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, #1a237e)`,
                      }),
                    })}
                  >
                    {item.verifyngo ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        Verified
                        <TaskAltIcon sx={{ fontSize: "1.2rem" }} />
                      </Box>
                    ) : (
                      "Verify NGO"
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

export default Verifyngo;
