import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

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
                  <h1 className="text-lg">{roledetail[0].role}</h1>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {permissions &&
                      permissions.map((permission, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={checkedPermissions[permission.name]}
                              onChange={() => {
                                setCheckedPermissions(prevState => ({
                                  ...prevState,
                                  [permission.name]: !prevState[permission.name]
                                }));
                              }}
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
