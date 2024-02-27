import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const DropDownMenu2 = ({ onClose }) => {
  const handleProfileClick = () => {
    onClose();
  };

  return (
    <div className="flex flex-col dropdownmenu2">
      <ul className="flex flex-col gap-4">
        <li>
          
          <Link to="/profileform" onClick={handleProfileClick}>
            Profile Form
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu2;
