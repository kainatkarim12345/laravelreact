import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [surveydetail, setSurveyDetail] = useState(null);
  const [surveys, setSurveys] = useState("");
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
  

  const getSurveysData = async () => {
    try {
      const response = await axios.get("/getsurveys");
      setSurveys(response.data);
    } catch (error) {
      console.log("Error fetching surveys:", error);
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

  const questionform = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      const response = await axios.post("/questionform", data);

      if (response.status === 200) {
        setStatus(response.data);
      }
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
      const response = await axios.post("/addsurvey", data);

      if (response.status === 200) {
        setStatus(response.data);
      }
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
        getSurveyDetail,
        surveydetail,
        surveys,
        login,
        register,
        status,
        questionform,
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
