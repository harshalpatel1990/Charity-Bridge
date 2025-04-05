import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { Button, Grid } from "@mui/material";

function Volunteer() {
  function createvol(name, email, mobile) {
    return { name, email, mobile };
  }

  const rowsv = [
    
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid item xs={12} md={12} lg={12}>
          <TableContainer sx={{ width: "100%" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: "16px 24px" }}>Name</TableCell>
                  <TableCell sx={{ padding: "16px 24px" }}>Mobile</TableCell>
                  <TableCell sx={{ padding: "16px 24px" }}>Email</TableCell>
                  <TableCell sx={{ padding: "16px 24px" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsv.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell
                      sx={{ padding: "16px 24px" }}
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ padding: "16px 24px" }}>
                      {row.mobile}
                    </TableCell>
                    <TableCell sx={{ padding: "16px 24px" }}>
                      {row.email}
                    </TableCell>
                    <TableCell>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Button variant="outlined">View Details</Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default Volunteer;
