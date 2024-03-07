import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

export default function EmployeeDetail() {
  const { getEmployeeDetail, employeedetail, getPermissionsData, permissions } = useAuthContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployeeDetail(id);
  }, [getEmployeeDetail, id]);

  useEffect(() => {
    if (employeedetail && employeedetail.length > 0) {
      setLoading(false);
    }
  }, [employeedetail]);


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
                      <h1 className="mt-5 text-2xl md:text-2xl font-bold" style={{ paddingBottom: '10px' }}>Employee name: {employeedetail[0].name}</h1>
                      <div className="hidden w-full md:block md:w-auto">
                        <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                          <li>Status {employeedetail[0].status}</li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  <h1 className="mt-5 text-2xl md:text-2xl font-bold" style={{ paddingBottom: '10px' }}>Role: {employeedetail[0].role}</h1>
                  <p className="mt-5">Username: {employeedetail[0].user_name}</p>
                  <p className="mt-5">Email: {employeedetail[0].email}</p>
                  <p className="mt-5">Phone number: {employeedetail[0].phone_number}</p>
                  <p className="mt-5">City: {employeedetail[0].city}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
