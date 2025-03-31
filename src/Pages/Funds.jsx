import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { Button, Grid } from "@mui/material";

function createfunds(name, funds) {
  return { name, funds };
}

const rowsf = [
  createfunds("Frozen yoghurt", 159),
  createfunds("Ice cream sandwich", 237),
  createfunds("Eclair", 262),
  createfunds("Cupcake", 305),
  createfunds("Gingerbread", 35),
  createfunds("Total"),
];
function Funds() {
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item size={12}>
        <TableContainer component={Paper} >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: "16px 24px" }}>Name</TableCell>

                <TableCell sx={{ padding: "16px 24px" }}>Funds</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsf.map((row) => (
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
                    {row.funds}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </Grid>
    </Grid>
    // </=>
  );
}

export default Funds;
