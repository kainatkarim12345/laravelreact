import React, { useState, useEffect } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import DropDownMenu1 from "../components/DropDownMenu1";
import DropDownMenu2 from "../components/DropDownMenu2";
import SurveyForm from "../pages/SurveyForm";

const AuthLayout = () => {
  const { user, getUser, logout } = useAuthContext();
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [showSurveyForm, setShowSurveyForm] = useState(false);

  const handleMenu1Click = () => {
    setOpenMenu1((prev) => !prev);
  };

  const handleMenu2Click = () => {
    setOpenMenu2((prev) => !prev);
  };

  return user ? (
    <>
      <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="block rounded py-2 pr-4 pl-3 text-white" aria-current="page">
            Home
          </Link>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
            <li>
                <span
                  className="surveydropdown block rounded py-2 pr-4 pl-3 text-white"
                  aria-current="page"
                  onClick={handleMenu2Click}
                >
                  Profile
                </span>
                {openMenu2 && <DropDownMenu2 onClose={handleMenu2Click} />}
              </li>
              <li>
                <span
                  className="surveydropdown block rounded py-2 pr-4 pl-3 text-white"
                  aria-current="page"
                  onClick={handleMenu1Click}
                >
                  Survey
                </span>
                {openMenu1 && <DropDownMenu1 onClose={handleMenu1Click} />}
              </li>
              <li>
                <button className="block rounded py-2 pr-4 pl-3 text-white" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showSurveyForm && <SurveyForm />}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthLayout;
