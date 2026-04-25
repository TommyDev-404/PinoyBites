import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth.context";

type ProtectedRouteType = {
      role: string;
}

export default function ProtectedRoute({ role }: ProtectedRouteType) {
      const { user } = useAuth();
      
      if (!user) {
            return (
                  <Navigate 
                        to={role === "admin" ? "/admin/login" : "/home"}
                        replace
                  />
            );
      }

      if (role && user.role !== role) {
            return (
                  <Navigate 
                        to="/not-authorized"
                        replace
                        state={{ message: "Access denied.", login: false, role: "user" }}
                  />
            );
      }

      return <Outlet />;
}