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
} from "@mui/material";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

function UserHistory() {
  const [value, setValue] = useState(0);
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [contributionHistory, setContributionHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contributionHistory.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.activityName}</TableCell>
                        <TableCell>{row.ngoName}</TableCell>
                        <TableCell>₹{row.amount}</TableCell>
                        <TableCell>{row.date}</TableCell>
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
    </Box>
  );
}

export default UserHistory;
