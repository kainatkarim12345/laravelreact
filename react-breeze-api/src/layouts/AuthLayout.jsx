import React, { useState, useEffect } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import SurveyForm from "../pages/SurveyForm";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

const AuthLayout = () => {
  const { user, getUser, logout } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

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
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ color: 'white' }} 
            >
              Survey
            </Button>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  
                >
                  <MenuItem onClick={handleClose}>
                    <Link to="/surveyform">
                      Add Survey/Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/questionform">
                      Add Question
                    </Link>
                  </MenuItem>
                </Menu>
    
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
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthLayout;
