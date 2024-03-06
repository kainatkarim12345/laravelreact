import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import swal from 'sweetalert';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [surveydetail, setSurveyDetail] = useState(null);
  const [roledetail, setRoleDetail] = useState(null);
  const [surveys, setSurveys] = useState("");
  const [terms, setTerms] = useState("");
  const [permissions, setPermissions] = useState("");
  const [roles, setRoles] = useState("");
  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getQuestions = async (surveyType) => {
    try {
      const response = await axios.get(`/getquestions?type=${surveyType}`);
      setQuestions(response.data);
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  };

  const getSurveyDetail = async (id) => {
    try {
      const response = await axios.get(`/surveydetail?type=${id}`);
      setSurveyDetail(response.data);
    } catch (error) {
      console.log("Error fetching setSurveyDetail:", error);
    }
  };

  const getRoleDetail = async (id) => {
    try {
      const response = await axios.get(`/roledetail?type=${id}`);
      setRoleDetail(response.data);
    } catch (error) {
      console.log("Error fetching setRoleDetail:", error);
    }
  }; 
  
  // const getRoleDetail = async (id) => {
  //   try {
  //     const response = await axios.get(`/roledetail?type=${id}`);
  //     setRoleDetail(response.data);
  //   } catch (error) {
  //     console.log("Error fetching setRoleDetail:", error);
  //   }
  // }; 

  const getSurveysData = async () => {
    try {
      const response = await axios.get("/getsurveys");
      setSurveys(response.data);
    } catch (error) {
      console.log("Error fetching surveys:", error);
    }
  };

  const getTermsData = async () => {
    try {
      const response = await axios.get("/getterms");
      setTerms(response.data);
    } catch (error) {
      console.log("Error fetching terms:", error);
    }
  };

  const getRolesData = async () => {
    try {
      const response = await axios.get("/getroles");
      setRoles(response.data);
    } catch (error) {
      console.log("Error fetching role:", error);
    }
  };

  const getPermissionsData = async () => {
    try {
      const response = await axios.get("/getpermissions");
      setPermissions(response.data);
    } catch (error) {
      console.log("Error fetching role:", error);
    }
  };

  const login = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      const response = await axios.post("/login", data);
      await getUser();
      navigate("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        setErrors(ex.response.data.errors);
      } else {
        console.log("An unexpected error occurred:", ex);
      }
    }
  };

  const register = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/register", data);
      await getUser();
      navigate("/");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const termsform = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      await axios.post("/termsform", data);
      await getTermsData();
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        setErrors(ex.response.data.errors);
      } else {
        console.log("An unexpected error occurred:", ex);
      }
    }
  };

  const questionform = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      await axios.post("/questionform", data);
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        setErrors(ex.response.data.errors);
      } else {
        console.log("An unexpected error occurred:", ex);
      }
    }
  };

  const addsurvey = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      await axios.post("/addsurvey", data);
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        setErrors(ex.response.data.errors);
      } else {
        console.log("An unexpected error occurred:", ex);
      }
    }
  };

  const addrole = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      await axios.post("/addrole", data);
      await getRolesData();
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        setErrors(ex.response.data.errors);
      } else {
        console.log("An unexpected error occurred:", ex);
      }
    }
  };

  const logout = () => {
    axios.post("/logout").then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        setErrors,
        getUser,
        getQuestions,
        questions,
        getSurveysData,
        getTermsData,
        getRoleDetail,
        roledetail,
        terms,
        addrole,
        getSurveyDetail,
        surveydetail,
        getRolesData,
        getPermissionsData,
        permissions,
        roles,
        surveys,
        login,
        register,
        status,
        questionform,
        termsform,
        addsurvey,
        logout,
        csrf,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
