import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const RoleForm = () => {
  const [role, setRole] = useState("");
  const [checkedPermissions, setCheckedPermissions] = useState({});
  const { errors, setErrors, getRoleDetail, roledetail, getPermissionsData, permissions, updateRole } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    if (!permissions) {
      getPermissionsData();
    }
  }, []);

  useEffect(() => {
    if (id) {
      getRoleDetail(id);
    }
  }, [getRoleDetail, id]);

  useEffect(() => {
    if (roledetail && roledetail.length > 0) {
      const initialPermissions = {};
      roledetail.forEach((permission) => {
        initialPermissions[permission.name] = true;
      });
      setCheckedPermissions(initialPermissions);
      setRole(roledetail[0].role);
    }
  }, [roledetail]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleCheckboxChange = (permissionName) => {
    setCheckedPermissions((prevCheckedPermissions) => ({
      ...prevCheckedPermissions,
      [permissionName]: !prevCheckedPermissions[permissionName],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      role,
      permissions: Object.keys(checkedPermissions).filter((permissionName) => checkedPermissions[permissionName]),
    };
    updateRole(id, formData);
  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full ">
            <div className="relative mx-auto max-w-[500px] overflow-hidden rounded-lg bg-white py-9 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">Edit Role</div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    value={role}
                    onChange={handleRoleChange}
                    placeholder="Role"
                    className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  {errors.role && (
                    <div className="flex">
                      <span className="text-red-400 text-sm">
                        *{errors.role[0]}
                      </span>
                    </div>
                  )}
                </div>
                {permissions &&
                  permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedPermissions[permission.name] || false}
                            onChange={() => handleCheckboxChange(permission.name)}
                          />
                        }
                        label={permission.name}
                      />
                    </div>
                  ))}
                <div className="mb-10">
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleForm;
