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

      // Set the page width
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Add a header with background color
      pdf.setFillColor("#1a237e");
      pdf.rect(0, 0, pageWidth, 20, "F"); // Draw a filled rectangle
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor("#ffffff");
      pdf.text("Donation Receipt", pageWidth / 2, 13, { align: "center" });

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
      pdf.setFontSize(10);
      pdf.setTextColor(150);
      pdf.text(
        "Thank you for your contribution!",
        pageWidth / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );

      // Save the PDF
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
    <Box
      sx={{ py: 4, bgcolor: "#f5f5f5", minHeight: "100vh", marginTop: "64px" }}
    >
      <Container>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#1a237e",
            fontWeight: "bold",
            mb: 4,
            fontFamily: "'Playfair Display', cursive",
          }}
        >
          Your Activity History
        </Typography>

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                fontFamily: "'Dancing Script', cursive",
              },
            }}
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
                <Table>
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
                <Table>
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
