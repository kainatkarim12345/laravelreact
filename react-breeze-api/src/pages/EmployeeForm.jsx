import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [status, setStatus] = useState("Employee created successfully");
  const { addemployee, roles, getRolesData, errors, setErrors } = useAuthContext();

  useEffect(() => {
    if (!roles) {
      getRolesData();
    }
  }, []);

  const handleEmployee = async (event) => {
    event.preventDefault();

    let isValid = true;
    const newErrors = {};

    if (!selectedRole) {
      newErrors.selectedRole = ["Role type is select"];
      isValid = false;
    }
    if (!name) {
        newErrors.name = ["Name is required"];
        isValid = false;
      }
      if (!username) {
        newErrors.username = ["Username is required"];
        isValid = false;
      }
      if (!email) {
        newErrors.email = ["Email is required"];
        isValid = false;
      }
      if (!password) {
        newErrors.password = ["Password is required"];
        isValid = false;
      }
      if (!city) {
        newErrors.city = ["City is required"];
        isValid = false;
      }
    if (!isValid) {
        setErrors(newErrors);
        return;
      }

    addemployee({
      name,
      email,
      username,
      password,
      city,
      role: selectedRole,
    });

    swal({
        position: "top-end",
        icon: "success",
        title: status,
        showConfirmButton: false,
        timer: 1500
      });

    setName("");
    setUserName("");
    setPassword("");
    setEmail("");
    setCity("");
    setSelectedRole("");
  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full ">
            <div
              className="
                relative
                mx-auto
                max-w-[500px]
                overflow-hidden
                rounded-lg
                bg-white
                py-9
                text-center
                sm:px-12
                md:px-[60px]
                "
            >
              <div className="mb-10 text-center md:mb-16">Employee Form</div>
              <form onSubmit={handleEmployee}>
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="
                        bordder-[#E9EDF4]
                        w-full
                        rounded-md
                        border
                        bg-[#FCFDFE]
                        py-3
                        px-5
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus:border-primary
                        focus-visible:shadow-none
                        "
                  />
                  {errors.name && (
                    <div className="flex">
                      <span className="text-red-400 text-sm">
                        *{errors.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                    className="
                            bordder-[#E9EDF4]
                            w-full
                            rounded-md
                            border
                            bg-[#FCFDFE]
                            py-3
                            px-5
                            text-base text-body-color
                            placeholder-[#ACB6BE]
                            outline-none
                            focus:border-primary
                            focus-visible:shadow-none
                        "
                  />
                  {errors.username && (
                    <div className="flex">
                      <span className="text-red-400 text-sm">
                        *{errors.username[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="
                            bordder-[#E9EDF4]
                            w-full
                            rounded-md
                            border
                            bg-[#FCFDFE]
                            py-3
                            px-5
                            text-base text-body-color
                            placeholder-[#ACB6BE]
                            outline-none
                            focus:border-primary
                            focus-visible:shadow-none
                        "
                  />
                  {errors.email && (
                    <div className="flex">
                      <span className="text-red-400 text-sm">
                        *{errors.email[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="
                            bordder-[#E9EDF4]
                            w-full
                            rounded-md
                            border
                            bg-[#FCFDFE]
                            py-3
                            px-5
                            text-base text-body-color
                            placeholder-[#ACB6BE]
                            outline-none
                            focus:border-primary
                            focus-visible:shadow-none
                        "
                  />
                  {errors.password && (
                    <div className="flex">
                      <span className="text-red-400 text-sm">
                        *{errors.password[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="
                            bordder-[#E9EDF4]
                            w-full
                            rounded-md
                            border
                            bg-[#FCFDFE]
                            py-3
                            px-5
                            text-base text-body-color
                            placeholder-[#ACB6BE]
                            outline-none
                            focus:border-primary
                            focus-visible:shadow-none
                        "
                  />
                  {errors.city && (
                    <div className="flex">
                      <span className="text-red-400 text-sm">
                        *{errors.city[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full border rounded-md bg-[#FCFDFE] py-3 px-5 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none"
                  >
                    <option value="">Select Role</option>
                    {roles &&
                      Array.isArray(roles) &&
                      roles.map((role, index) => (
                        <option key={index} value={role.id}>
                          {role.role}
                        </option>
                      ))}
                  </select>
                  {errors.selectedRole && (
                      <div className="flex">
                        <span className="text-red-400 text-sm">
                          *{errors.selectedRole[0]}
                        </span>
                      </div>
                    )}
                </div>
                <div className="mb-10">
                  <button
                    type="submit"
                    className="
                        w-full
                        px-4
                        py-3
                        bg-indigo-500
                        hover:bg-indigo-700
                        rounded-md
                        text-white
                        "
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

export default EmployeeForm;
