import { useState } from "react";
import useAuthContext from "../context/AuthContext";

const TermsForm = () => {
  const [textterm, setTextTerm] = useState("");
  const [status, setStatus] = useState("Terms and conditions created");


  const { termsform, errors, setErrors } = useAuthContext();

  

  const setValidation = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: [message],
    }));
  };

  const handleTerms = async (event) => {
    event.preventDefault();
  
    if (!textterm.trim()) {
      setErrors({ textterm: ["Field is required."] });
      return;
    }

    try {
      await termsform({ textterm });

      swal({
        position: "top-end",
        icon: "success",
        title: status,
        showConfirmButton: false,
        timer: 1500
      });
      setTextTerm("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }

  };
  

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full ">
            <div className="relative mx-auto max-w-[500px] overflow-hidden rounded-lg bg-white py-9 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">Terms and condition</div>
              <form onSubmit={handleTerms}>
                <div className="mb-4">
                  <textarea
                    value={textterm}
                    onChange={(e) => setTextTerm(e.target.value)}
                    placeholder="write here"
                    className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  {errors.textterm && (
                    <div className="flex">
                      <span className="text-red-400 text-sm">
                        *{errors.textterm[0]}
                      </span>
                    </div>
                  )}
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

export default TermsForm;
