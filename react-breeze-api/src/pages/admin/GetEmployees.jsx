import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";

const GetEmployees = () => {
  const { getEmployeesData, employees, employeestatuschange } =
    useAuthContext();
  const [employeeStatus, setEmployeeStatus] = useState({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Employee status changed");

  useEffect(() => {
    if (!employees) {
      getEmployeesData();
    }
  }, []);

  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
    message: "",
  });

  function GrowTransition(props) {
    return <Grow {...props} />;
  }

  const handleClick = (message, Transition) => () => {
    setState({
      open: true,
      Transition,
      message,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const handleStatusChange = (employeeId, event) => {
    const { value } = event.target;
    setEmployeeStatus((prevStatus) => ({
      ...prevStatus,
      [employeeId]: value,
    }));
    setError("");
  };
  const [selectedStatus, setSelectedStatus] = useState([]);


  const handleSubmitStatus = (employeeId) => {
    const selectedStatus = employeeStatus[employeeId];
    if (!selectedStatus) {
      setError("Status not selected");
      handleClick("Status not selected", Slide)();
      return;
    }
    if (!["pending", "approved", "disapproved"].includes(selectedStatus)) {
      setError("Invalid status selected");
      handleClick("Invalid status selected", Slide)();
      return;
    }

    employeestatuschange({
      selectedStatus,
      employeeId,
    });

    handleClick("Employee status changed", Slide)();
    setSelectedStatus("");
  };

  return (
    <section className="bg-[#F4F7FF] py-10 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full ">
            <div
              className="
                  relative
                  mx-auto
                  max-w-[1000px]
                  overflow-hidden
                  rounded-lg
                  bg-white
                  py-9
                  text-center
                  sm:px-12
                  md:px-[10px]
                  "
            >
              <h1 className="text-2xl md:text-4xl font-bold">-</h1>
              <br />
              <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                message={state.message}
                key={state.Transition.name}
                autoHideDuration={1200}
              />
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
                      <TableCell>View</TableCell>
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
                          <TableCell scope="row">{employee.name}</TableCell>
                          <TableCell scope="row">{employee.email}</TableCell>
                          <TableCell scope="row">{employee.role}</TableCell>
                          <TableCell>
                            {employee.status === "approved" && (
                              <Button variant="contained" color="success">
                                {employee.status}
                              </Button>
                            )}
                            {employee.status === "pending" && (
                              <Button variant="contained" color="primary">
                                {employee.status}
                              </Button>
                            )}
                            {employee.status === "disapproved" && (
                              <Button variant="contained" color="error">
                                {employee.status}
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <div>
                              <select
                                value={employeeStatus[employee.id] || ""}
                                onChange={(event) =>
                                  handleStatusChange(employee.id, event)
                                }
                              >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="disapproved">Disapproved</option>
                              </select>
                              <button
                                onClick={() => handleSubmitStatus(employee.id)}
                              >
                                <SwapHorizontalCircleIcon />
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Link
                              to={{
                                pathname: "/employeedetail/" + employee.id,
                              }}
                            >
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
