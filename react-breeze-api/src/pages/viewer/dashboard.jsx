// AdministrationDashboard.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from '../Home';
import PrivateRoute from "../../context/PrivateRoute";
import Terms from "./Terms";
import GetEmployees from "./GetEmployees";
import Roles from "./Roles";
import GetSurveys from "./GetSurveys";
import SurveyDetail from "./SurveyDetail";
import RoleDetail from "./RoleDetail";
// import EmployeeDetail from "./EmployeeDetail";

function ViewerDashboard() {
  return (
    <div>
      <h1>Viewer Dashboard</h1>
      <Routes>
        <Route/>
            
            <Route path="/terms" element={<Terms />} />
            <Route path="/getemployees" element={<GetEmployees />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/getsurveys" element={<GetSurveys />} />
            <Route path="/surveydetail/:id" element={<SurveyDetail />} />
            <Route path="/roledetail/:id" element={<RoleDetail />} />
            {/* <Route path="/employeedetail/:id" element={<EmployeeDetail />} /> */}
            <Route path="/dashboard" element={<Home />} />
      </Routes>
    </div>
  );
}

export default ViewerDashboard;
