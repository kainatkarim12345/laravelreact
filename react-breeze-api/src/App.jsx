import { Route , Routes } from "react-router-dom";
import Home from './pages/Home';
import SurveyForm from './pages/SurveyForm';
import ProfileForm from './pages/ProfileForm';
import QuestionForm from "./pages/QuestionForm";
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
            <Route path="/" element={<Home />} />
            <Route path="/surveyform" element={<SurveyForm />} />
            <Route path="/profileform" element={<ProfileForm />} />
            <Route path="/questionform" element={<QuestionForm />} />
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
