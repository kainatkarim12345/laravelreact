import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import { useEffect } from "react";

const RoleForm = () => {
  const [role, setRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [status, setStatus] = useState("Role created");
  const { addrole, errors, setErrors, getPermissionsData, permissions } = useAuthContext();

  useEffect(() => {
    if (!permissions) {
      getPermissionsData();
    }
  }, []);

  const handleRole = async (event) => {
    event.preventDefault();
  
    if (!role.trim()) {
      setErrors({ role: ["Field is required."] });
      return;
    }
  
    const selectedPermissionIds = permissions
      .filter(permission => selectedPermissions.includes(permission.id))
      .map(permission => permission.id);
  
    try {
      addrole({ role, permissions: selectedPermissionIds });
      
      swal({
        position: "top-end",
        icon: "success",
        title: status,
        showConfirmButton: false,
        timer: 1500
      });
      setRole("");
      setSelectedPermissions([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions(prevPermissions => {
      if (prevPermissions.includes(permissionId)) {
        return prevPermissions.filter(id => id !== permissionId);
      } else {
        return [...prevPermissions, permissionId];
      }
    });
  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full ">
            <div className="relative mx-auto max-w-[500px] overflow-hidden rounded-lg bg-white py-9 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">Add Role</div>
              <form onSubmit={handleRole}>
                <div className="mb-4">
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="write here"
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
                <div className="mb-4">
                  <label className="block text-gray-700 text-left font-bold mb-2">Permissions:</label>
                  {permissions &&
                    permissions.map((permission, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`permission-${index}`}
                          className="mr-2"
                          value={permission.id}
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handleCheckboxChange(permission.id)}
                        />
                        <label htmlFor={`permission-${index}`}>{permission.name}</label>
                      </div>
                    ))}
                </div>
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
