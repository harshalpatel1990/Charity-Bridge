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
import { collection, query, where, getDocs } from "firebase/firestore";
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

        // First get the user ID from userinfo collection
        const userInfoQuery = query(
          collection(db, "userinfo"),
          where("email", "==", currentUser.email)
        );
        const userInfoSnapshot = await getDocs(userInfoQuery);

        if (userInfoSnapshot.empty) {
          console.error("User info not found");
          setLoading(false);
          return;
        }

        const userId = userInfoSnapshot.docs[0].id;

        // Fetch volunteer history using user ID
        const volunteerQuery = query(
          collection(db, "volunteers"),
          where("userId", "==", userId)
        );
        const volunteerSnapshot = await getDocs(volunteerQuery);
        const volunteerData = volunteerSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate()?.toLocaleDateString() || "N/A",
        }));

        // Fetch contribution history using user ID
        const contributionQuery = query(
          collection(db, "contributions"),
          where("userId", "==", userId)
        );
        const contributionSnapshot = await getDocs(contributionQuery);
        const contributionData = contributionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate()?.toLocaleDateString() || "N/A",
        }));

        setVolunteerHistory(volunteerData);
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
