import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Update the styling components
const styles = {
  pageContainer: {
    py: 4,
    bgcolor: "rgba(26, 35, 126, 0.02)",
    minHeight: "100vh",
    marginTop: "64px",
  },
  header: {
    textAlign: "center",
    color: "#1a237e",
    fontWeight: "bold",
    mb: 4,
    fontFamily: "'Playfair Display', serif",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -10,
      left: "50%",
      transform: "translateX(-50%)",
      width: "60px",
      height: "3px",
      background: "linear-gradient(90deg, #1a237e, #3949ab)",
      borderRadius: "2px",
    },
  },
  tabs: {
    "& .MuiTab-root": {
      color: "#1a237e",
      opacity: 0.7,
      "&.Mui-selected": {
        color: "#1a237e",
        opacity: 1,
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#1a237e",
    },
  },
  table: {
    "& .MuiTableHead-root": {
      "& .MuiTableCell-root": {
        backgroundColor: "#1a237e",
        color: "white",
        fontWeight: "bold",
      },
    },
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root": {
        "&:nth-of-type(odd)": {
          backgroundColor: "rgba(26, 35, 126, 0.02)",
        },
        "&:hover": {
          backgroundColor: "rgba(26, 35, 126, 0.05)",
        },
      },
    },
  },
  chip: {
    "&.MuiChip-root": {
      backgroundColor: "#1a237e",
      color: "white",
      "&:hover": {
        backgroundColor: "#283593",
      },
    },
  },
  dialog: {
    "& .MuiDialogTitle-root": {
      backgroundColor: "#1a237e",
      color: "white",
    },
    "& .MuiDialogActions-root": {
      borderTop: "1px solid rgba(26, 35, 126, 0.1)",
    },
  },
};

function UserHistory() {
  const [value, setValue] = useState(0);
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [contributionHistory, setContributionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDialogOpen = (activity) => {
    setSelectedActivity(activity);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedActivity(null);
  };

  const generatePDF = async () => {
    if (!selectedActivity) return;

    try {
      // Fetch contributor details from userinfo collection
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No user logged in");
        return;
      }

      // Query userinfo collection using email
      const userQuery = query(
        collection(db, "userinfo"),
        where("email", "==", currentUser.email) // Assuming 'email' is stored in userinfo
      );
      const userSnapshot = await getDocs(userQuery);

      let contributorDetails = {
        name: "N/A",
        age: "N/A",
        gender: "N/A",
      };

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data(); // Get the first matching document
        contributorDetails = {
          name: userData.name || "N/A",
          age: userData.age || "N/A",
          gender: userData.gender || "N/A",
        };
      } else {
        console.warn("No user document found for email:", currentUser.email);
      }

      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add custom header with logo
      pdf.setFillColor(26, 35, 126); // #1a237e
      pdf.rect(0, 0, pageWidth, 40, "F");
      
      // Add charity bridge logo
      pdf.addImage("/logo.png", "PNG", 10, 5, 30, 30);
      
      // Header text
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.setTextColor(255, 255, 255);
      pdf.text("Contribution Receipt", pageWidth / 2, 25, { align: "center" });

      // Add decorative line
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineWidth(0.5);
      pdf.line(40, 35, pageWidth - 40, 35);

      // Contributor details section
      pdf.setFillColor(242, 243, 248); // Light background
      pdf.rect(0, 50, pageWidth, 50, "F");
      
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(26, 35, 126);
      pdf.text("Contributor's Details", 20, 65);

      // Add Contributor's Name Section
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor("#000000");
      pdf.text("Contributor's Details", 10, 30);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(`Name: ${contributorDetails.name}`, 10, 40);
      pdf.text(`Age: ${contributorDetails.age}`, 10, 50);
      pdf.text(`Gender: ${contributorDetails.gender}`, 10, 60);

      // Add a section divider with background color
      pdf.setFillColor("#1a237e");
      pdf.rect(0, 70, pageWidth, 10, "F"); // Draw a filled rectangle
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor("#ffffff");
      pdf.text("Activity Details", pageWidth / 2, 77, { align: "center" });

      // Add Activity Details
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor("#000000");
      pdf.text(`Activity Name: ${selectedActivity.activityName || "N/A"}`, 10, 90);
      pdf.text(`NGO Name: ${selectedActivity.ngoName || "N/A"}`, 10, 100);
      pdf.text(`Amount Donated: ${selectedActivity.amount || 0}`, 10, 110);
      pdf.text(`Date: ${selectedActivity.date || "N/A"}`, 10, 120);
      pdf.text(`Description:`, 10, 130);

      // Add a multi-line description
      const description = pdf.splitTextToSize(
        selectedActivity.description || "No description available",
        pageWidth - 20
      );
      pdf.text(description, 10, 140);

      // Add a footer
      pdf.setFillColor(26, 35, 126);
      pdf.rect(0, pageHeight - 20, pageWidth, 20, "F");
      
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.text(
        "Thank you for your contribution to making a difference!",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );

      pdf.save(`${selectedActivity.activityName}_Receipt.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.error("No user logged in");
          setLoading(false);
          return;
        }

        const userEmail = currentUser.email;

        // Fetch contribution history using email directly
        const contributionQuery = query(
          collection(db, "contributions"),
          where("userEmail", "==", userEmail)
        );
        const contributionSnapshot = await getDocs(contributionQuery);

        // Fetch activity and NGO details for each contribution
        const contributionData = await Promise.all(
          contributionSnapshot.docs.map(async (contributionDoc) => {
            const contribution = contributionDoc.data();

            // Fetch activity details using activityId
            const activityDocRef = doc(db, "activities", contribution.activityId);
            const activityDoc = await getDoc(activityDocRef);
            const activityData = activityDoc.exists() ? activityDoc.data() : {};

            // Fetch NGO details using ngoid from activityData
            let ngoName = "N/A";
            if (activityData.ngoid) {
              const ngoDocRef = doc(db, "ngoinfo", activityData.ngoid);
              const ngoDoc = await getDoc(ngoDocRef);
              ngoName = ngoDoc.exists() ? ngoDoc.data().ngoname || "N/A" : "N/A";
            }

            return {
              id: contributionDoc.id,
              ...contribution,
              activityName: activityData.activityname || "N/A",
              ngoName: ngoName,
              date: contribution.timestamp?.toDate()?.toLocaleDateString() || "N/A",
              amount: contribution.amount || 0,
              description: activityData.description || "No description available",
            };
          })
        );

        setContributionHistory(contributionData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
        setLoading(false);
      }
    };

    // Add auth state listener to handle user state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchHistory();
      } else {
        setLoading(false);
        setContributionHistory([]);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.error("No user logged in");
          setLoading(false);
          return;
        }

        // Use currentUser.email directly since that's what we store in collections
        const userEmail = currentUser.email;

        // Fetch volunteer history using email directly
        const volunteerQuery = query(
          collection(db, "volunteers"),
          where("userEmail", "==", userEmail)
        );
        const volunteerSnapshot = await getDocs(volunteerQuery);
        const volunteerData = await Promise.all(
            volunteerSnapshot.docs.map(async (volunteerDoc) => {
              const volunteer = volunteerDoc.data();
          
              let activityData = {};
              if (volunteer.activityId) {
                const activityDocRef = doc(db, "activities", volunteer.activityId);
                const activityDoc = await getDoc(activityDocRef);
                if (activityDoc.exists()) {
                  activityData = activityDoc.data();
                } else {
                  console.warn("No activity found for ID:", volunteer.activityId);
                }
              }
              let ngoName = "N/A";
              if (activityData.ngoid) {
                const ngoDocRef = doc(db, "ngoinfo", activityData.ngoid);
                const ngoDoc = await getDoc(ngoDocRef);
                ngoName = ngoDoc.exists() ? ngoDoc.data().ngoname || "N/A" : "N/A";
              }
          
              return {
                id: volunteerDoc.id,
                ...volunteer,
                activityName: activityData.activityname || "N/A",
                ngoName: ngoName || "N/A",
                date: volunteer.timestamp?.toDate()?.toLocaleDateString() || "N/A",
                status: volunteer.status || "Pending",
              };
            })
          );
          

        setVolunteerHistory(volunteerData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
        setLoading(false);
      }
    };

    // Add auth state listener to handle user state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchHistory();
      } else {
        setLoading(false);
        setVolunteerHistory([]);
        setContributionHistory([]);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  

  return (
    <Box sx={styles.pageContainer}>
      <Container>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          sx={styles.header}
        >
          Your Activity History
        </Typography>

        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={styles.tabs}
          >
            <Tab
              icon={<VolunteerActivismIcon />}
              label='Volunteering History'
              sx={{ textTransform: "none" }}
            />
            <Tab
              icon={<MonetizationOnIcon />}
              label='Contribution History'
              sx={{ textTransform: "none" }}
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {value === 0 && (
              <TableContainer>
                <Table sx={styles.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Activity Name</TableCell>
                      <TableCell>NGO Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {volunteerHistory.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.activityName}</TableCell>
                        <TableCell>{row.ngoName}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            color={
                              row.status === "Completed" ? "success" : "primary"
                            }
                            size='small'
                            sx={styles.chip}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {value === 1 && (
              <TableContainer>
                <Table sx={styles.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Activity Name</TableCell>
                      <TableCell>NGO Name</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contributionHistory.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.activityName}</TableCell>
                        <TableCell>{row.ngoName}</TableCell>
                        <TableCell>₹{row.amount}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <Chip
                            label='View Receipt'
                            color='primary'
                            size='small'
                            onClick={() => handleDialogOpen(row)}
                            sx={styles.chip}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {loading && (
              <Typography sx={{ textAlign: "center", py: 3 }}>
                Loading history...
              </Typography>
            )}

            {!loading && value === 0 && volunteerHistory.length === 0 && (
              <Typography sx={{ textAlign: "center", py: 3 }}>
                No volunteering history found.
              </Typography>
            )}

            {!loading && value === 1 && contributionHistory.length === 0 && (
              <Typography sx={{ textAlign: "center", py: 3 }}>
                No contribution history found.
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Dialog for Activity Details */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        sx={styles.dialog}
        TransitionProps={{
          onEntering: () => console.log("Dialog opened"),
        }}
      >
        <DialogTitle>Activity Details</DialogTitle>
        <DialogContent>
          {selectedActivity && (
            <div id="activity-details">
              <Typography variant="h6" gutterBottom>
                Activity Name: {selectedActivity.activityName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                NGO Name: {selectedActivity.ngoName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Amount Donated: ₹{selectedActivity.amount}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date: {selectedActivity.date}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Description: {selectedActivity.description}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={generatePDF} color="primary">
            Download PDF
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserHistory;
