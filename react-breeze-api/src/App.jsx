import { Routes, Route, Navigate } from "react-router-dom";
import useAuthContext from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import ViewerDashboard from "./pages/viewer/dashboard";
import AdministrationDashboard from "./pages/admin/dashboard";
import AuthLayout from "./layouts/AuthLayout";
import ViewerLayout from "./layouts/ViewerLayout";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Roles from "./pages/admin/Roles";
import ProfileForm from './pages/ProfileForm';
import QuestionForm from "./pages/admin/QuestionForm";
import TermsForm from "./pages/admin/TermsForm";
import SurveyForm from "./pages/admin/SurveyForm";
// import RoleForm from "./pages/admin/RoleForm";
import EmployeeForm from "./pages/admin/EmployeeForm";
import RoleEdit from "./pages/admin/RoleEdit";
import Terms from "./pages/admin/Terms";
import GetEmployees from "./pages/admin/GetEmployees";
import GetSurveys from "./pages/admin/GetSurveys";
import SurveyDetail from "./pages/admin/SurveyDetail";
import RoleDetail from "./pages/admin/RoleDetail";
import EmployeeDetail from "./pages/admin/EmployeeDetail";
import ResetPassword from "./pages/ResetPassword";

const App = () => {

  const { user } = useAuthContext();

  const getLayout = () => {
    if (!user) {
      return <GuestLayout />;
    } else {
      switch (user.role) {
        case "Viewer":
          return <ViewerLayout />;
        case "Administration":
          return <AuthLayout />;
        default:
          return <GuestLayout />;
      }
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <AuthProvider>
        <Routes>
          <Route element={getLayout()}>
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route path="/surveyform" element={<SurveyForm />} />
            <Route path="/profileform" element={<ProfileForm />} />
            <Route path="/questionform" element={<QuestionForm />} />
            <Route path="/termsform" element={<TermsForm />} />
            <Route path="/employeeform" element={<EmployeeForm />} />
            {/* <Route path="/roleform" element={<RoleForm />} /> */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/getemployees" element={<GetEmployees />} />
            <Route path="roles" element={<Roles />} />
            <Route path="/getsurveys" element={<GetSurveys />} />
            <Route path="/surveydetail/:id" element={<SurveyDetail />} />
            <Route path="/roledetail/:id" element={<RoleDetail />} />
            <Route path="/employeedetail/:id" element={<EmployeeDetail />} />
            <Route path="/roleedit/:id" element={<RoleEdit />} /> 
          </Route>

          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset/:token" element={<ResetPassword />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

const DashboardRouter = () => {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case "Viewer":
      return <ViewerDashboard />;
    case "Administration":
      return <AdministrationDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

export default App;
