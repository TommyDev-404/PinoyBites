import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth.context";

export default function GuestRoute() {
      const { user } = useAuth();

      return user ? 
            <Navigate 
                  to="/products" 
                  replace 
            /> 
      :  
            <Outlet />;
}