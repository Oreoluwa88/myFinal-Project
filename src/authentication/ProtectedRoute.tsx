import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: any) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;