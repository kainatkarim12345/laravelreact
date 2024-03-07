import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useEffect } from "react";
import { Link } from "react-router-dom";

const GetEmployees = () => {
  const { getEmployeesData, employees } = useAuthContext();

  useEffect(() => {
    if (!employees) {
      getEmployeesData();
    }
  }, []);

  return (
    <section className="bg-[#F4F7FF] py-10 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full ">
            <div
              className="
                  relative
                  mx-auto
                  max-w-[900px]
                  overflow-hidden
                  rounded-lg
                  bg-white
                  py-9
                  text-center
                  sm:px-12
                  md:px-[10px]
                  "
            >
              <h1 className="text-2xl md:text-4xl font-bold">
                Employees Roles
              </h1>
              <br />
              <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                  <Link
                    to="/employeeform"
                    className="block rounded py-2 pr-4 pl-3 bg-white text-[#4338CA]"
                    aria-current="page"
                  >
                    Add Employee
                  </Link>
                </div>
              </nav>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  {employees &&
                    Array.isArray(employees) &&
                    employees.map((employee, index) => (
                      <TableBody key={index}>
                        <TableRow
                          key={employee.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{++index}</TableCell>
                          <TableCell scope="row">
                            {employee.name}
                          </TableCell>
                          <TableCell scope="row">
                            {employee.email}
                          </TableCell>
                          <TableCell scope="row">
                            {employee.role}
                          </TableCell>
                          <TableCell scope="row">
                            {employee.status}
                          </TableCell>
                          <TableCell>
                            <Link to={{ pathname:"/employeedetail/"+employee.id }}>
                              <VisibilityIcon />
                            </Link>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetEmployees;
