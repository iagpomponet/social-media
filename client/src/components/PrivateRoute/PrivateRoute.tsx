import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { PrivateRouteI } from "./PrivateRoute.types";

const PrivateRoute = ({ ...props }: PrivateRouteI) => {
  const { userData } = useAuth();

  console.log(`userData`, userData)

  return <>{userData?.isLogged ? props.element || props.children : <Navigate to="/signup" />}</>;
};

export default PrivateRoute;
