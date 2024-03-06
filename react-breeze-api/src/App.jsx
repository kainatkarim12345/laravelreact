import { Route , Routes } from "react-router-dom";
import Home from './pages/Home';
import SurveyForm from './pages/SurveyForm';
import ProfileForm from './pages/ProfileForm';
import QuestionForm from "./pages/QuestionForm";
import TermsForm from "./pages/TermsForm";
import RoleForm from "./pages/RoleForm";
import RoleEdit from "./pages/RoleEdit";
import Terms from "./pages/Terms";
import Roles from "./pages/Roles";
import GetSurveys from "./pages/GetSurveys";
import SurveyDetail from "./pages/SurveyDetail";
import RoleDetail from "./pages/RoleDetail";
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from "./pages/ForgotPassword";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import ResetPassword from "./pages/ResetPassword";

function App() {

  return (
    <div className="bg-slate-100 min-h-screen">
        <Routes>
          <Route element={<AuthLayout />}>
            
            <Route path="/surveyform" element={<SurveyForm />} />
            <Route path="/profileform" element={<ProfileForm />} />
            <Route path="/questionform" element={<QuestionForm />} />
            <Route path="/termsform" element={<TermsForm />} />
            <Route path="/roleform" element={<RoleForm />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/getsurveys" element={<GetSurveys />} />
            <Route path="/surveydetail/:id" element={<SurveyDetail />} />
            <Route path="/roledetail/:id" element={<RoleDetail />} />
            <Route path="/roleedit/:id" element={<RoleEdit />} />
            <Route path="/" element={<Home />} />
          </Route>
          
          <Route element={<GuestLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/password-reset/:token" element={<ResetPassword />} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
