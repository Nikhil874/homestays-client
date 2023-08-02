import { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-hot-toast";
import DialogBox from "./DialogBox";



const formattedRows = (usersData) => {
  const rows = [];
  if (!!usersData?.length) {
    usersData.forEach((user) => {
      const {
        _id:id,
        name,
        paid,
        room: { roomNo },
      } = user;
      rows.push({id, name, RoomNo: roomNo, PaymentStatus: paid });
    });
  }

  return rows;
};
const rowsPerPageOptions = [5, 10, 20];

export default function UsersTable(props) {
  const tableheadRef = useRef(null);
  const { rows, getUsersOfPg, totalEntries } = props;
  const tableRows = formattedRows(rows);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const params = useParams();
  
  
  const changePaymentStatusToPaid = async (row) => {
    try {
      axios.post(`${BASE_URL}/users/${row.id}`, { paid: true }).then((res) => {
        toast.success(`${row.name} has completed the payment!`);
        getUsersOfPg(params.id, currentPage, rowsPerPage);
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  function addButton(row) {
    return !row.PaymentStatus ? (
      <DialogBox row={row} changePaymentStatusToPaid={changePaymentStatusToPaid} />
    ) : (
      <Button disabled={row.PaymentStatus}>Paid</Button>
    );
  }
  
  const scrollToViewFn = () => {
    tableheadRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  
  useEffect(() => {
    if (params?.id) {
        getUsersOfPg(params.id, currentPage, rowsPerPage);
        scrollToViewFn();
    }
  }, [currentPage, rowsPerPage]);

  const handlePageChange = (e) => {
    const operation = e.target.dataset.testid;
    if (operation === "KeyboardArrowLeftIcon") setCurrentPage(currentPage - 1);
    else if (operation === "KeyboardArrowRightIcon")
      setCurrentPage(currentPage + 1);
  };
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(e.target.value)
    setCurrentPage(1);
  }
  return (
    <TableContainer component={Paper}>
      <Table
      // size="small"
      // aria-label="a dense table"
      >
        <TableHead ref={tableheadRef}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Tenant Name</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700 }}>
              Room No
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 700 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!tableRows?.length ? (
            tableRows.map((row) => (
              <TableRow
                key={row.name * Math.random() * 1000}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ width: "33%" }}>
                  {row.name}
                </TableCell>
                <TableCell align="right" sx={{ width: "33%" }}>
                  {row.RoomNo}
                </TableCell>
                <TableCell align="right" sx={{ width: "33%" }}>
                  {addButton(row)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <Typography
              sx={{
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1.2rem",
              }}
            >
              No Tenants in this PG
            </Typography>
          )}
        </TableBody>
        {!!tableRows?.length && (
          <TablePagination
            count={totalEntries}
            page={currentPage - 1}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            rowsPerPageOptions={rowsPerPageOptions}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </Table>
    </TableContainer>
  );
}
