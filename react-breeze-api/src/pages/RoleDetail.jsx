import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RoleDetail(props) {
  const { getRoleDetail, roledetail, getPermissionsData, permissions } = useAuthContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [checkedPermissions, setCheckedPermissions] = useState({});

  useEffect(() => {
    getRoleDetail(id);
  }, [getRoleDetail, id]);

  useEffect(() => {
    if (!permissions) {
      getPermissionsData();
    }
  }, []);

  useEffect(() => {
    if (roledetail) {
      setLoading(false);
    }
  }, [roledetail]);

  useEffect(() => {
    const initialCheckedPermissions = {};
    if (permissions && roledetail) {
      permissions.forEach(permission => {
        const match = roledetail.find(role => role.name === permission.name);
        initialCheckedPermissions[permission.name] = !!match;
      });
      setCheckedPermissions(initialCheckedPermissions);
    }
  }, [permissions, roledetail]);

  const isCheckboxDisabled = (permissionName) => {
    if (!roledetail || !permissions) return true;
    const match = roledetail.find(role => role.name === permissionName);
    return !match;
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
                    <h1 className="mt-5 text-2xl md:text-4xl font-bold" style={{paddingBottom:'10px'}}>Role name: {roledetail[0].role}</h1>
                      <div className="hidden w-full md:block md:w-auto">
                        <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                          <li>
                          <Link style={{color:'#ff9800'}} to={{ pathname:"/roleedit/"+roledetail[0].id}}>
                             <EditIcon />
                          </Link>&nbsp;&nbsp;
                          <Link style={{color:'red'}} to={{ pathname:"/roledelete"}}>
                             <DeleteIcon />
                          </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {permissions &&
                      permissions.map((permission, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={checkedPermissions[permission.name]}
                              disabled={isCheckboxDisabled(permission.name)}
                            />
                          }
                          label={permission.name}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
