import "./App.css";
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/";
import { collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIbNwfOHAQeERMc8GAkpZ297uDgLye-SE",
  authDomain: "mmgdatabase-d5933.firebaseapp.com",
  databaseURL: "https://mmgdatabase-d5933-default-rtdb.firebaseio.com",
  projectId: "mmgdatabase-d5933",
  storageBucket: "mmgdatabase-d5933.appspot.com",
  messagingSenderId: "343456883644",
  appId: "1:343456883644:web:d7bb23e964decd1be6c1b9",
  measurementId: "G-LGPKJFP15M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function createData(name, catalog, category, typeclass, date, location) {
  return { name, catalog, category, typeclass, date, location };
}

async function getMeteorDatabase(db) {
  const querySnapshot = await getDocs(collection(db, "meteorites"));
  var res = [];
  querySnapshot.forEach((doc) => {
    var docData = doc.data();
    const myJSON = JSON.stringify(docData);
    const parsedJSON = JSON.parse(myJSON);
    res.push(parsedJSON);
  });
  console.log(res);
  return res;
}

const meteorites = getMeteorDatabase(db);
console.log(meteorites);

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "catalog", label: "Catalog No.", minWidth: 100 },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
  },
  {
    id: "typeclass",
    label: "Class",
    minWidth: 170,
  },
  {
    id: "date",
    label: "Date Found",
    minWidth: 170,
  },
  { id: "location", label: "Location Found", minWidth: 170 },
];

const rows = [];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
