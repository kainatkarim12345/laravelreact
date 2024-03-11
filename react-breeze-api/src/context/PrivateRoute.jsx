import { Navigate, Route } from "react-router-dom";
import useAuthContext  from "./AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { user , getUser } = useAuthContext();

  return user ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
