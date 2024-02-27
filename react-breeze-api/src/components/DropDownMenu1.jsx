import React from "react";
import { Link } from "react-router-dom";

const DropDownMenu1 = ({ onClose }) => {
  const handleSurveyClick = () => {
    onClose();
  };

  return (
    <div className="flex flex-col dropdownmenu1">
      <ul className="flex flex-col gap-4">
        <li>
          <Link to="#" onClick={handleSurveyClick}>
            Survey
          </Link>
        </li>
        <li>
          
          <Link to="/surveyform" onClick={handleSurveyClick}>
            Survey Form
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu1;
