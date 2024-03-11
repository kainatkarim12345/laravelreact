import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";

export default function EmployeeDetail() {
  const {
    getEmployeeDetail,
    employeedetail,
    employeestatuschange,
    getPermissionsData,
    permissions,
  } = useAuthContext();

  const [employeeStatus, setEmployeeStatus] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Employee status changed");

  useEffect(() => {
    getEmployeeDetail(id);
  }, [getEmployeeDetail, id]);

  useEffect(() => {
    if (employeedetail && employeedetail.length > 0) {
      setLoading(false);
    }
  }, [employeedetail]);

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
          <div className="w-full">
            <div className="mx-auto max-w-[1200px] bg-white rounded-lg px-6 py-9">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
                    <div className="container mx-auto flex flex-wrap items-center justify-between">
                      <h1
                        className="mt-5 text-2xl md:text-2xl font-bold"
                        style={{ paddingBottom: "10px" }}
                      >
                        Employee name: {employeedetail[0].name}
                      </h1>
                      <div className="hidden w-full md:block md:w-auto">
                        <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                          <li> 
                          {employeedetail[0].status === "approved" && (
                              <Button variant="contained" color="success">
                                {employeedetail[0].status}
                              </Button>
                            )}
                            {employeedetail[0].status === "pending" && (
                              <Button variant="contained" color="primary">
                                {employeedetail[0].status}
                              </Button>
                            )}
                            {employeedetail[0].status === "disapproved" && (
                              <Button variant="contained" color="error">
                                {employeedetail[0].status}
                              </Button>
                            )}</li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  <Snackbar
                    open={state.open}
                    onClose={handleClose}
                    TransitionComponent={state.Transition}
                    message={state.message}
                    key={state.Transition.name}
                    autoHideDuration={1200}
                  />
                  <h1
                    className="mt-5 text-2xl md:text-2xl font-bold"
                    style={{ paddingBottom: "10px" }}
                  >
                    Role: {employeedetail[0].role}
                  </h1>
                  <div>
                    <select
                      value={employeeStatus[employeedetail[0].id] || ""}
                      onChange={(event) =>
                        handleStatusChange(employeedetail[0].id, event)
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="disapproved">Disapproved</option>
                    </select>
                    <button
                      onClick={() => handleSubmitStatus(employeedetail[0].id)}
                    >
                      <SwapHorizontalCircleIcon />
                    </button>
                  </div>
                  <p className="mt-5">
                    Username: {employeedetail[0].user_name}
                  </p>
                  <p className="mt-5">Email: {employeedetail[0].email}</p>
                  <p className="mt-5">
                    Phone number: {employeedetail[0].phone_number}
                  </p>
                  <p className="mt-5">City: {employeedetail[0].city}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
